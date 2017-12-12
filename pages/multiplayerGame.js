import React, { Component } from 'react';
import PropTypes from 'prop-types';

import config from '../src/config';
import { Router } from '../src/routes';

import {
    ShowWhenOnline,
    ShowWhenOffline,
} from '../src/components/detectOffline';

import Block from '../src/components/layout/Block';
import Page from '../src/components/layout/Page';
import Section from '../src/components/layout/Section';

import Grid from '../src/components/puzzle/Grid';

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
        isLoading: true,
        isWaitingPlayer: false,
        id: -1,
        otherPlayerId: -1,
        isMultiplayer: false,
        token: '',
        currentGrid: [],
        turn: -1,
        winnerId: -1,
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
            setTimeout(resolve, config.refreshDuration);
        });

        return this.waitForOtherPlayer(id, token);
    };

    requestGame = async (id, token) => {
        try {
            let {
                isMultiplayer,
                currentPlayer,
                otherPlayer,
                winner,
            } = await gameFactory()(id, token);

            if (isMultiplayer && !otherPlayer) {
                this.setState({ id, isWaitingPlayer: true });
                otherPlayer = await this.waitForOtherPlayer(id, token);
                this.setState({ isWaitingPlayer: false });
            }

            let newState = {
                isLoading: false,
                id,
                token,
                playerId: currentPlayer.id,
                isMultiplayer,
                currentGrid: currentPlayer.currentGrid,
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
            const { id, token } = this.state;
            const { currentPlayer, winner } = await moveFactory()(
                id,
                token,
                tile,
            );
            this.setState({
                currentGrid: currentPlayer.currentGrid,
                turn: currentPlayer.turn,
                winnerId: winner !== null ? winner.id : -1,
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

    handleClick = tile => {
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
            id,
            currentGrid,
            isLoading,
            isWaitingPlayer,
            playerId,
            turn,
            winnerId,
        } = this.state;
        const isWinner = winnerId !== -1;
        const isVictory = isWinner && winnerId === playerId;

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
                            <Grid
                                onClick={this.handleClick}
                                grid={currentGrid}
                                readOnly={isVictory}
                            />
                        </Block>
                    </Section>
                </ShowWhenOnline>
            </Page>
        );
    }
}
