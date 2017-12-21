'use strict';

const dynamodb = require('dynamodb');
const core = require('puzzle-core');
const uuid = require('uuid');

const authorization = require('./authorization');

const MIN_SIZE = 2;
const MAX_SIZE = 7;

module.exports.hello = (event, context, callback) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Go Serverless v1.0! Your function executed successfully!',
            input: event,
        }),
    };

    callback(null, response);
};

module.exports.new = (event, context, callback) => {
    const data = JSON.parse(event.body);

    const size = parseInt(data.size, 10);
    if (isNaN(size) || size < MIN_SIZE || size > MAX_SIZE) {
        return {
            statusCode: 400,
            headers: { 'Content-Type': 'text/plain' },
            body:
                "Couldn't create the game : the size should be an integer between 2 and 7",
        };
    }

    const game = core.initGame(size);

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            id: uuid.v1(),
            resolvedGrid: game.resolvedGrid,
            p1: {
                grid: game.currentGrid,
                token: uuid.v1(),
                turn: 0,
            },
        },
    };

    dynamodb.put(params, error => {
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'text/plain' },
                body: "Couldn't create the game.",
            });
            return;
        }
        callback(null, {
            statusCode: 200,
            body: JSON.stringify({
                id: params.Item.id,
                token: params.Item.p1.token,
            }),
        });
    });
};

module.exports.game = (event, context, callback) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: event.pathParameters.id,
        },
    };
    const token = authorization.getToken(event.headers);

    dynamodb.get(params, (error, result) => {
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'text/plain' },
                body: "Couldn't fetch the game.",
            });
            return;
        }

        const { id, p1, p2, resolvedGrid, winner } = result.Item;
        const { currentPlayer, otherPlayer } =
            p1.token === token || (p2 && p2.token !== token)
                ? { currentPlayer: p1, otherPlayer: p2 }
                : { currentPlayer: p2, otherPlayer: p1 };

        const response = {
            statusCode: 200,
            body: JSON.stringify({
                id,
                resolvedGrid,
                currentPlayer: {
                    grid: currentPlayer.grid,
                    turn: currentPlayer.turn,
                },
                otherPlayer: {
                    grid: otherPlayer.grid,
                    turn: otherPlayer.turn,
                },
                winner,
            }),
        };

        callback(null, response);
    });
};

module.exports.join = (event, context, callback) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Go Serverless v1.0! Your function executed successfully!',
            input: event,
        }),
    };

    callback(null, response);
};

module.exports.move = (event, context, callback) => {
    const { id, tile } = event.pathParameters;
    const token = getToken(event.headers);

    // validation
    if (!token || typeof id !== 'number' || typeof tile !== 'number') {
        callback(null, {
            statusCode: 400,
            headers: { 'Content-Type': 'text/plain' },
            body: "Couldn't update the todo item.",
        });
        return;
    }

    const { currentPlayer, otherPlayer } =
        p1.token === token || (p2 && p2.token !== token)
            ? { currentPlayer: p1, otherPlayer: p2 }
            : { currentPlayer: p2, otherPlayer: p1 };

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: event.pathParameters.id,
        },
        ExpressionAttributeNames: {
            '#p1': 'text',
        },
        ExpressionAttributeValues: {
            ':text': data.text,
        },
        UpdateExpression:
            'SET #todo_text = :text, checked = :checked, updatedAt = :updatedAt',
        ReturnValues: 'ALL_NEW',
    };

    dynamodb.update(params, (error, result) => {
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'text/plain' },
                body: "Couldn't update the game item.",
            });
            return;
        }

        const { id, p1, p2, resolvedGrid, winner } = result.Attributes;

        callback(null, {
            statusCode: 200,
            body: JSON.stringify({
                id,
                resolvedGrid,
                currentPlayer: {
                    grid: currentPlayer.grid,
                    turn: currentPlayer.turn,
                },
                otherPlayer: {
                    grid: otherPlayer.grid,
                    turn: otherPlayer.turn,
                },
                winner,
            }),
        });
    });
};

module.exports.games = (event, context, callback) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        KeyConditionExpression: 'p2 = :val',
        ExpressionAttributeValues: {
            ':val': null,
        },
    };

    dynamodb.scan(params, (error, result) => {
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'text/plain' },
                body: "Couldn't fetch the games.",
            });
            return;
        }
        callback(null, {
            statusCode: 200,
            body: JSON.stringify(result.Items),
        });
    });
};
