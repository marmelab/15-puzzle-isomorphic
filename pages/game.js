import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { defaultImageUrl, defaultPuzzleSize, imageUrls } from '../src/config';

import Block from '../src/components/Block';
import Button from '../src/components/Button';
import { ShowWhenOnline } from '../src/components/detectOffline';
import Grid from '../src/components/Grid';
import Page from '../src/components/Page';
import Section from '../src/components/Section';
import withLoader from '../src/components/withLoader';

import { choiceInArray } from '../src/core/helper';

import {
    areGridsEquals,
    buildGrid,
    findTileByValue,
    move,
} from '../src/core/game';
import { shuffle } from '../src/core/shuffler';

import { suggestFactory } from '../src/services/suggestMoveService';

const LoaderButton = withLoader(Button);

export const title = (isLoading, isVictory, turn) => {
    if (isLoading) {
        return 'Building a new game';
    }
    if (isVictory) {
        return `Congratulations, you have solved the puzzle in ${turn} turns!`;
    }
    if (turn === 0) {
        return 'Start the game by moving a tile';
    }
    return `${turn} moves`;
};

export default class Game extends Component {
    state = {
        currentGrid: [],
        imageUrl: defaultImageUrl,
        isLoading: true,
        isVictory: false,
        loadingAdvice: false,
        resolvedGrid: [],
        suggestedTile: 0,
        turn: -1,
    };

    static getInitialProps = ({ query }) => ({
        size: query.size || defaultPuzzleSize,
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
        try {
            let imageUrl = choiceInArray(imageUrls);
            this.setState({
                imageUrl,
            });
        } catch (error) {
            console.error(error);
        }
        this.buildGame();
    }

    render() {
        const {
            currentGrid,
            imageUrl,
            isLoading,
            isVictory,
            loadingAdvice,
            resolvedGrid,
            suggestedTile,
            turn,
        } = this.state;

        return (
            <Page navTitle="Singleplayer" title="Singleplayer | 15 puzzle">
                <Section>
                    <Block
                        isLoading={isLoading}
                        title={title(isLoading, isVictory, turn)}
                    >
                        {currentGrid && (
                            <Grid
                                onClick={this.handleClickTile}
                                grid={currentGrid}
                                imageUrl={imageUrl}
                                resolvedGrid={resolvedGrid}
                                readOnly={isVictory}
                                tileToHighlight={suggestedTile}
                            />
                        )}
                        {!isVictory && (
                            <div className="center">
                                <ShowWhenOnline>
                                    <LoaderButton
                                        isLoading={loadingAdvice}
                                        size="small"
                                        icon="help_outline"
                                        label="Ask for help"
                                        onClick={this.handleClickSuggest}
                                    />
                                </ShowWhenOnline>
                            </div>
                        )}
                    </Block>
                </Section>
            </Page>
        );
    }
}
