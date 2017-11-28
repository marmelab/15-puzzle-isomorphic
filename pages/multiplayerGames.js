import React, { Component } from 'react';

import Router from '../src/routes';

import Bloc from '../src/components/bloc';
import ListGames from '../src/components/listGames';
import Page from '../src/components/page';
import Section from '../src/components/section';

import { games, join } from '../src/services/multiplayerGameService';

export default class MultiplayerGames extends Component {
    state = {
        isLoading: true,
        openMultiplayerGames: [],
    };

    requestGames = async () => {
        try {
            const { gameIds } = await games()();

            this.setState({
                isLoading: false,
                openMultiplayerGames: gameIds,
            });
        } catch (error) {
            console.error(error);
            // TODO: catch the server error in order to display it to the user.
            Router.pushRoute('index');
        }
    };

    requestJoin = async id => {
        this.setState({
            isLoading: true,
        });

        try {
            const { token } = await join()(id);
            Router.pushRoute('multiplayer_game', { id, token });
        } catch (error) {
            console.error(error);
            // TODO: catch the server error in order to display it to the user.
        }

        this.setState({
            isLoading: false,
        });
    };

    handleOnGameSelected = async id => {
        this.requestJoin(id);
    };

    componentWillUpdate = async () => {
        this.requestGames();
    };

    render() {
        const { isLoading, openMultiplayerGames } = this.state;
        return (
            <Page>
                <Section>
                    <Bloc title="Multiplayer" isLoading={isLoading}>
                        <ListGames
                            games={openMultiplayerGames}
                            onGameSelected={this.handleOnGameSelected}
                        />
                    </Bloc>
                </Section>
            </Page>
        );
    }
}
