import React, { Component } from 'react';

import { Router } from '../src/routes';

import {
    ShowWhenOnline,
    ShowWhenOffline,
} from '../src/components/detectOffline';

import Block from '../src/components/layout/Block';
import Page from '../src/components/layout/Page';
import Section from '../src/components/layout/Section';

import Button from '../src/components/ui/Button';
import FloatingButton from '../src/components/ui/FloatingButton';
import FloatingButtonFab from '../src/components/ui/FloatingButtonFab';

import ListGames from '../src/components/puzzle/ListGames';

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
            <Page navTitle="Open games" title="Multiplayer games | 15 puzzle">
                <ShowWhenOffline>
                    <Section>
                        <Block title="Waiting for connection" isLoading={true}>
                            <p>This page is only accessile online.</p>
                        </Block>
                    </Section>
                </ShowWhenOffline>
                <ShowWhenOnline>
                    <Section>
                        <Block isLoading={isLoading}>
                            <ListGames
                                games={openMultiplayerGames}
                                onGameSelected={this.handleOnGameSelected}
                            />
                        </Block>
                    </Section>
                    <FloatingButton icon="add">
                        <FloatingButtonFab>
                            <Button
                                className="btn-floating"
                                color="green"
                                icon="play_circle_outline"
                                label="New multiplayer game"
                                onClick={this.handleClickMultiplayerGame}
                            />
                        </FloatingButtonFab>
                        <FloatingButtonFab>
                            <Button
                                className="btn-floating"
                                color="blue"
                                icon="refresh"
                                label="Refresh"
                                onClick={this.handleRefreshGames}
                            />
                        </FloatingButtonFab>
                    </FloatingButton>
                </ShowWhenOnline>
            </Page>
        );
    }
}
