import React, { Component } from 'react';
import PropTypes from 'prop-types';

import config from '../src/config';
import { Router } from '../src/routes';

import Bloc from '../src/components/bloc';
import Button from '../src/components/button';
import Grid from '../src/components/grid';
import Page from '../src/components/page';
import Row from '../src/components/row';
import Section from '../src/components/section';

import { game, move } from '../src/services/multiplayerGameService';

export default class MultiplayerGame extends Component {
    state = {
        isLoading: true,
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
        token: PropTypes.string.isRequired,
    };

    static getInitialProps = async ({ query }) => ({
        id: query.id,
        token: query.token,
    });

    waitForOtherPlayer = async (id, token) => {
        const { otherPlayer } = await game()(id, token);
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
            } = await game()(id, token);

            if (isMultiplayer && !otherPlayer) {
                otherPlayer = await this.waitForOtherPlayer(id, token);
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
            const { currentPlayer, winner } = await move()(id, token, tile);
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

    handleClick = tile => {
        this.requestMove(tile);
    };

    componentWillMount() {
        const { id, token } = this.props;
        this.requestGame(id, token);
    }

    render() {
        const { playerId, winnerId, currentGrid, turn, isLoading } = this.state;

        const isWinner = winnerId !== -1;
        const isVictory = isWinner && winnerId === playerId;

        return (
            <Page>
                <Section>
                    <Bloc
                        title={
                            isLoading
                                ? 'Building a new game'
                                : isWinner
                                  ? isVictory
                                    ? `Congratulations, you have solved the puzzle in ${
                                          turn
                                      } turns!`
                                    : `Sorry, you opponent solved the puzzle in ${
                                          turn
                                      } turns!`
                                  : `Turn ${turn}`
                        }
                        isLoading={isLoading}
                    >
                        <Grid
                            onClick={this.handleClick}
                            grid={currentGrid}
                            readOnly={isVictory}
                        />
                    </Bloc>
                </Section>
                <Section>
                    <Row>
                        <div className="buttons-wrapper">
                            <Button
                                icon="keyboard_return"
                                color="red"
                                label="Back to home"
                                route="multiplayer_games"
                            />
                        </div>
                    </Row>
                </Section>
            </Page>
        );
    }
}
