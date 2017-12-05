import React, { Component } from 'react';

import { Router } from '../src/routes';

import Bloc from '../src/components/bloc';
import Button from '../src/components/button';
import Col from '../src/components/col';
import {
    ShowWhenOnline,
    ShowWhenOffline,
} from '../src/components/detectOffline';
import ListGames from '../src/components/listGames';
import Image from '../src/components/image';
import Page from '../src/components/page';
import Section from '../src/components/section';

import {
    gamesFactory,
    joinFactory,
    newGameFactory,
} from '../src/services/multiplayerGameService';

export default class MultiplayerGames extends Component {
    state = {
        isLoading: true,
        openMultiplayerGames: [1, 2],
    };

    requestGames = async () => {
        try {
            this.setState({
                isLoading: true,
            });
            const { gameIds } = await gamesFactory()();
            this.setState({
                isLoading: false,
                openMultiplayerGames: Object.values(gameIds).map(
                    game => game.id,
                ),
            });
        } catch (error) {
            console.error(error);
            // TODO: catch the server error in order to display it to the user.
            Router.pushRoute('index');
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

    requestNewGame = async () => {
        try {
            const { id, token } = await newGameFactory()();
            Router.pushRoute('multiplayer_game', { id, token });
        } catch (error) {
            console.error(error);
            // TODO: catch the server error in order to display it to the user.
        }
    };

    handleRefreshGames = () => {
        this.requestGames();
    };

    handleOnGameSelected = id => {
        this.requestJoin(id);
    };

    handleClickMultiplayerGame = () => {
        this.requestNewGame();
    };

    componentWillMount() {
        this.requestGames();
    }

    render() {
        const { isLoading, openMultiplayerGames } = this.state;

        return (
            <Page>
                <ShowWhenOffline>
                    <Section>
                        <Bloc title="Waiting for connection" isLoading="true">
                            <p>This page is only accessile online.</p>
                        </Bloc>
                        <Col>
                            <div className="buttons-wrapper">
                                <Button
                                    icon="keyboard_return"
                                    color="red"
                                    label="Back to home"
                                    route="index"
                                />
                            </div>
                        </Col>
                    </Section>
                </ShowWhenOffline>
                <ShowWhenOnline>
                    <Section>
                        <Bloc title="Welcome to the multiplayer 15 puzzle game!">
                            <Image
                                src="/static/images/banner.jpg"
                                alt="15 puzzle picture"
                            />
                            <Col>
                                <Button
                                    color="red"
                                    icon="keyboard_return"
                                    label="Back to home"
                                    route="index"
                                />
                                <Button
                                    color="blue"
                                    icon="refresh"
                                    label="Refresh"
                                    onClick={this.handleRefreshGames}
                                />
                                <Button
                                    color="green"
                                    icon="play_circle_outline"
                                    label="New multiplayer game"
                                    onClick={this.handleClickMultiplayerGame}
                                />
                            </Col>
                        </Bloc>
                        <Bloc title="Join an open game" isLoading={isLoading}>
                            <ListGames
                                games={openMultiplayerGames}
                                onGameSelected={this.handleOnGameSelected}
                            />
                        </Bloc>
                    </Section>
                </ShowWhenOnline>
            </Page>
        );
    }
}
