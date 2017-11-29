import React, { Component } from 'react';

import Router from '../src/routes';

import Bloc from '../src/components/bloc';
import ListGames from '../src/components/listGames';
import Button from '../src/components/button';
import Page from '../src/components/page';
import Row from '../src/components/row';
import Section from '../src/components/section';

import { games } from '../src/services/multiplayerGameService';

export default class MultiplayerGames extends Component {
    state = {
        isLoading: true,
        openMultiplayerGames: [1, 2],
    };

    requestGames = async () => {
        try {
            const { gameIds } = await games()();
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

    requestJoin = async () => {};

    handleOnGameSelected = async id => {
        this.requestJoin(id);
    };

    componentWillMount() {
        this.requestGames();
    }

    render() {
        const { isLoading, openMultiplayerGames } = this.state;

        return (
            <Page>
                <Section>
                    <Bloc title="Open multiplayer games" isLoading={isLoading}>
                        <ListGames
                            games={openMultiplayerGames}
                            onGameSelected={this.handleOnGameSelected}
                        />
                    </Bloc>
                    <Row>
                        <div className="buttons-wrapper">
                            <Button
                                icon="keyboard_return"
                                color="red"
                                label="Back to home"
                                route="/"
                            />
                        </div>
                    </Row>
                </Section>
            </Page>
        );
    }
}
