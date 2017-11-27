import React, { Component } from 'react';

import Bloc from '../src/components/bloc';
import Button from '../src/components/button';
import Grid from '../src/components/grid';
import Page from '../src/components/page';
import Row from '../src/components/row';
import Section from '../src/components/section';

import { buildGrid, findTileByValue, move } from '../src/core/game';
import { shuffle } from '../src/core/shuffler';

export default class Index extends Component {
    state = {
        isLoading: true,
        currentGrid: null,
        initialGrid: null,
        turn: -1,
        isVictory: false,
    };

    handleClick = tile => {
        const { currentGrid, turn } = this.state;
        try {
            const coordsTileToMove = findTileByValue(currentGrid, tile);
            const newCurrentGrid = move(currentGrid, coordsTileToMove);
            this.setState({
                currentGrid: newCurrentGrid,
                turn: turn + 1,
            });
        } catch (error) {
            console.error(error);
            return;
        }
    };

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

        return (
            <Page>
                <Section>
                    <Bloc
                        title={
                            isLoading
                                ? 'Building a new game'
                                : isVictory
                                  ? `Congratulations, you have solved the puzzle in ${
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
}
