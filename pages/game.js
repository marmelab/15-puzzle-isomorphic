import React, { Component } from 'react';
import PropTypes from 'prop-types';

import config from '../src/config';

import Bloc from '../src/components/bloc';
import Button from '../src/components/button';
import { ShowWhenOnline } from '../src/components/detectOffline';
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

import { suggestFactory } from '../src/services/suggestMoveService';

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
        currentGrid: [],
        isLoading: true,
        isVictory: false,
        loadingAdvice: false,
        resolvedGrid: [],
        suggestedTile: 0,
        turn: -1,
    };

    static getInitialProps = ({ query }) => ({
        size: query.size || config.defaultPuzzleSize,
    });

    static propTypes = {
        size: PropTypes.number.isRequired,
    };

    handleClickTile = tile => {
        const { currentGrid, resolvedGrid, turn } = this.state;

        try {
            const coordsTileToMove = findTileByValue(currentGrid, tile);
            const newCurrentGrid = move(currentGrid, coordsTileToMove);
            const isVictory = areGridsEquals(newCurrentGrid, resolvedGrid);

            const newState = {
                currentGrid: newCurrentGrid,
                isVictory,
                suggestedTile: 0,
                turn: turn + 1,
            };

            this.setState(newState);
        } catch (error) {
            console.error(error);
            // TODO : catch the findTileByValue and the move errors in order to display them to the user.
        }
    };

    requestSuggest = async () => {
        const { currentGrid, resolvedGrid } = this.state;
        this.setState({ loadingAdvice: true });
        try {
            const { Tile } = await suggestFactory()(currentGrid, resolvedGrid);
            this.setState({
                loadingAdvice: false,
                suggestedTile: Tile,
            });
        } catch (error) {
            console.error(error);
            // TODO : catch the errors in order to display them to the user.
        }
    };

    handleClickSuggest = () => {
        const { loadingAdvice } = this.state;
        if (loadingAdvice) {
            return;
        }
        this.requestSuggest();
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
            currentGrid,
            isLoading,
            isVictory,
            loadingAdvice,
            resolvedGrid,
            suggestedTile,
            turn,
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
                                onClick={this.handleClickTile}
                                grid={currentGrid}
                                resolvedGrid={resolvedGrid}
                                readOnly={isVictory}
                            />
                        )}
                        {loadingAdvice && <p>Looking for an advice...</p>}
                        {!loadingAdvice &&
                            suggestedTile !== 0 && (
                                <p>You could move the tile {suggestedTile}</p>
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
                            {!isLoading &&
                                !isVictory && (
                                    <ShowWhenOnline>
                                        <Button
                                            icon="help_outline"
                                            label="Ask for help"
                                            onClick={this.handleClickSuggest}
                                        />
                                    </ShowWhenOnline>
                                )}
                        </div>
                    </Row>
                </Section>
            </Page>
        );
    }
}
