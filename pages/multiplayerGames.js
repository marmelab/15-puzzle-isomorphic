import React, { Component } from 'react';

import Bloc from '../src/components/bloc';
import ListGames from '../src/components/listGames';
import Page from '../src/components/page';
import Section from '../src/components/section';

import { games } from '../src/services/multiplayerGameService';

export default class MultiplayerGames extends Component {
    state = {
        isLoading: true,
        openMultiplayerGames: [],
    };

    handleOnGameSelected = () => {};

    componentWillMount = async () => {
        const openMultiplayerGames = await games()();

        this.setState({
            isLoading: false,
            openMultiplayerGames,
        });
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
