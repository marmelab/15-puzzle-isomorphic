import React, { Component } from 'react';

import config from '../src/config';

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
        currentGrid: [],
        resolvedGrid: [],
        turn: -1,
        isVictory: false,
    };

    static getInitialProps = ({ query }) => {
        return query.size || config.defaultPuzzleSize;
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
            // TODO : catch the findTileByValue and the move errors in order to display them to the user.
        }
    };

    buildGame = async () => {
        const { size } = this.props;

        let resolvedGrid = buildGrid(size);
        let currentGrid = await shuffle(resolvedGrid);

        this.setState({
            isLoading: false,
            currentGrid,
            resolvedGrid,
            turn: 0,
            isVictory: false,
        });
    };

    componentWillMount() {
        this.buildGame();
    }

    render() {
        const {
            isLoading,
            currentGrid,
            resolvedGrid,
            turn,
            isVictory,
        } = this.state;

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
                        {currentGrid && (
                            <Grid
                                onClick={this.handleClick}
                                grid={currentGrid}
                                resolvedGrid={resolvedGrid}
                                readOnly={isVictory}
                            />
                        )}
                    </Bloc>
                </Section>
                <Section>
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
