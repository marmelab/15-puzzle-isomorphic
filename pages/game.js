import React, { Component } from 'react';

import Bloc from '../src/components/bloc';
import Button from '../src/components/button';
import Grid from '../src/components/grid';
import Page from '../src/components/page';
import Row from '../src/components/row';
import Section from '../src/components/section';

import {
    areGridsEquals,
    buildGrid,
    findTileByValue,
    move,
} from '../src/core/game';
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
        const { currentGrid, resolvedGrid, turn } = this.state;

        try {
            const coordsTileToMove = findTileByValue(currentGrid, tile);
            const newCurrentGrid = move(currentGrid, coordsTileToMove);
            const isVictory = areGridsEquals(newCurrentGrid, resolvedGrid);

            const newState = {
                currentGrid: newCurrentGrid,
                isVictory,
                turn: turn + 1,
            };

            this.setState(newState);
        } catch (error) {
            console.error(error);
            return;
        }
    };

    componentWillMount = async () => {
        let resolvedGrid = buildGrid(4);
        // let currentGrid = await shuffle(resolvedGrid);

        let currentGrid = [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 0, 15],
        ];

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
