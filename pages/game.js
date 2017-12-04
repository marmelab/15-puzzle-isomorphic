import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

export const title = (isLoading, isVictory, turn) => {
    if (isLoading) {
        return 'Building a new game';
    }
    if (isVictory) {
        return `Congratulations, you have solved the puzzle in ${turn} turns!`;
    }
    return `Turn ${turn}`;
};

export default class Game extends Component {
    state = {
        isLoading: true,
        currentGrid: [],
        resolvedGrid: [],
        turn: -1,
        isVictory: false,
    };

    static getInitialProps = ({ query }) => ({
        size: query.size || config.defaultPuzzleSize,
    });

    static propTypes = {
        size: PropTypes.number.isRequired,
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
                        title={title(isLoading, isVictory, turn)}
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
                                route="index"
                            />
                        </div>
                    </Row>
                </Section>
            </Page>
        );
    }
}
