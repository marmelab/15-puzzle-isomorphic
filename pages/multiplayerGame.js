import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { refreshDuration } from '../src/config';
import { Router } from '../src/routes';

import {
    ShowWhenOnline,
    ShowWhenOffline,
} from '../src/components/detectOffline';

import Block from '../src/components/layout/Block';
import Page from '../src/components/layout/Page';
import Section from '../src/components/layout/Section';

import Game from '../src/components/puzzle/Game';

import {
    gameFactory,
    joinFactory,
    moveFactory,
} from '../src/services/multiplayerGameService';

export const title = (
    id,
    isLoading,
    isVictory,
    isWaitingPlayer,
    isWinner,
    turn,
) => {
    if (isLoading && !isWaitingPlayer) {
        return `Loading the game #${id}`;
    }
    if (isWaitingPlayer) {
        return `Waiting for another player in game #${id}`;
    }
    if (isWinner) {
        if (isVictory) {
            return `Congratulations, you have solved the puzzle in ${
                turn
            } turns!`;
        }
        return `Sorry, you opponent solved the puzzle in ${turn} turns!`;
    }
    if (turn === 0) {
        return 'Start the game by moving a tile';
    }
    return `${turn} moves`;
};

export default class MultiplayerGame extends Component {
    state = {
        currentGrid: [],
        id: -1,
        isLoading: true,
        isMultiplayer: false,
        isVictory: false,
        isWaitingPlayer: false,
        otherPlayerId: -1,
        resolvedGrid: [],
        token: '',
        turn: -1,
    };

    static propTypes = {
        id: PropTypes.string.isRequired,
        token: PropTypes.string,
    };

    static getInitialProps = async ({ query }) => {
        return {
            id: query.id,
            token: query.token || null,
        };
    };

    waitForOtherPlayer = async (id, token) => {
        const { otherPlayer } = await gameFactory()(id, token);
        if (otherPlayer) {
            return Promise.resolve(otherPlayer);
        }

        await new Promise(resolve => {
            setTimeout(resolve, refreshDuration);
        });

        return this.waitForOtherPlayer(id, token);
    };

    requestGame = async (id, token) => {
        try {
            let {
                currentPlayer,
                isMultiplayer,
                otherPlayer,
                resolvedGrid,
                winner,
            } = await gameFactory()(id, token);

            if (isMultiplayer && !otherPlayer) {
                this.setState({ id, isWaitingPlayer: true });
                otherPlayer = await this.waitForOtherPlayer(id, token);
                this.setState({ isWaitingPlayer: false });
            }

            let newState = {
                currentGrid: currentPlayer.currentGrid,
                id,
                isLoading: false,
                isMultiplayer,
                playerId: currentPlayer.id,
                resolvedGrid,
                token,
                turn: currentPlayer.turn,
                winnerId: winner !== null ? winner.id : -1,
            };

            if (isMultiplayer && otherPlayer) {
                newState.otherPlayerId = otherPlayer.id;
            }
            this.setState(newState);
        } catch (error) {
            console.error(error);
            // TODO: catch the server error in order to display it to the user.
            Router.pushRoute('multiplayer_games');
        }
    };

    requestMove = async tile => {
        try {
            const { id, token, playerId } = this.state;
            const { currentPlayer, winner } = await moveFactory()(
                id,
                token,
                tile,
            );

            const winnerId = winner !== null ? winner.id : -1;
            const isWinner = winnerId !== -1;
            const isVictory = isWinner && winnerId === playerId;

            this.setState({
                currentGrid: currentPlayer.currentGrid,
                turn: currentPlayer.turn,
                isWinner,
                isVictory,
            });
        } catch (error) {
            console.error(error);
            // TODO: catch the server error in order to display it to the user.
        }
    };

    requestJoin = async id => {
        try {
            const { token } = await joinFactory()(id);
            Router.pushRoute('multiplayer_game', { id, token });
        } catch (error) {
            console.error(error);
            // TODO: catch the server error in order to display it to the user.
        }
    };

    handleClickTile = tile => {
        this.requestMove(tile);
    };

    componentWillMount() {
        const { id, token } = this.props;

        if (id === -1) {
            Router.pushRoute('multiplayer_games');
            return;
        }
        if (!token) {
            this.requestJoin(id);
        }
        this.requestGame(id, token);
    }

    render() {
        const {
            currentGrid,
            id,
            isLoading,
            isWaitingPlayer,
            isVictory,
            resolvedGrid,
            turn,
            isWinner,
        } = this.state;

        return (
            <Page navTitle="Multiplayer" title="Multiplayer | 15 puzzle">
                <ShowWhenOffline>
                    <Section>
                        <Block title="Waiting for connection" isLoading={true}>
                            <p>This page is only accessile online.</p>
                        </Block>
                    </Section>
                </ShowWhenOffline>
                <ShowWhenOnline>
                    <Section>
                        <Block
                            title={title(
                                id,
                                isLoading,
                                isVictory,
                                isWaitingPlayer,
                                isWinner,
                                turn,
                            )}
                            isLoading={isLoading}
                        >
                            <Game
                                currentGrid={currentGrid}
                                isVictory={isVictory}
                                onClickTile={this.handleClickTile}
                                resolvedGrid={resolvedGrid}
                            />
                        </Block>
                    </Section>
                </ShowWhenOnline>
            </Page>
        );
    }
}
