import React, { Component } from 'react';

import ActivityIndicator from '../src/components/activityIndicator';
import Bloc from '../src/components/bloc';
import Button from '../src/components/button';
import Grid from '../src/components/grid';
import Page from '../src/components/page';
import Row from '../src/components/row';
import Section from '../src/components/section';

import { buildGrid } from '../src/core/game';
import { shuffle } from '../src/core/shuffler';

export default class Index extends Component {
    state = {
        isLoading: true,
        currentGrid: null,
        initialGrid: null,
        turn: -1,
        isVictory: false,
    };

    handleClick = () => {};

    renderWinnerMessage(isVictory, turn) {
        return isVictory
            ? `Congratulations, you have solved the puzzle in ${turn} turns!`
            : `Turn ${turn}`;
    }

    componentWillMount = async () => {
        let resolvedGrid = buildGrid(4);
        let currentGrid = await shuffle(resolvedGrid);

        this.setState({
            isLoading: false,
            currentGrid,
            resolvedGrid,
            turn: 0,
            isVictory: false,
        });
    };

    render() {
        const { isLoading, currentGrid, turn, isVictory } = this.state;

        if (isLoading) {
            return (
                <Page>
                    <Section>
                        <Bloc title="Building a new game">
                            <div className="activity-indicator-wrapper">
                                <ActivityIndicator />
                            </div>
                        </Bloc>
                    </Section>
                    <Section>
                        <Row>
                            <Button
                                icon="keyboard_return"
                                label="Back to home"
                                path="/"
                            />
                        </Row>
                    </Section>
                </Page>
            );
        }

        return (
            <Page>
                <Section>
                    <Bloc title={this.renderWinnerMessage(isVictory, turn)}>
                        <Grid
                            onClick={this.handleClick}
                            grid={currentGrid}
                            readOnly={isVictory}
                        />
                    </Bloc>
                </Section>
            </Page>
        );
    }
}
