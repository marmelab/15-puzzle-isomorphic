import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { defaultPuzzleSize } from '../src/config';

import { ShowWhenOnline } from '../src/components/detectOffline';
import withLoader from '../src/components/withLoader';

import Block from '../src/components/layout/Block';
import Page from '../src/components/layout/Page';
import Section from '../src/components/layout/Section';

import Button from '../src/components/ui/Button';
import Switch from '../src/components/ui/Switch';

import Grid from '../src/components/puzzle/Grid';

import { initGame, moveTile } from '../src/core/main';

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

const labels = {
    off: 'Hide',
    on: 'Show',
    title: 'Display the numbers',
};

export default class Game extends Component {
    state = {
        currentGrid: [],
        isLoading: true,
        isVictory: false,
        loadingAdvice: false,
        resolvedGrid: [],
        showTileNumbers: false,
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
            const move = moveTile({ currentGrid, resolvedGrid, turn }, tile);

            this.setState({
                currentGrid: move.currentGrid,
                isVictory: move.isVictory,
                suggestedTile: 0,
                turn: move.turn,
            });
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

    handleOnToggle = toggleState => {
        this.setState({
            showTileNumbers: toggleState,
        });
    };

    buildGame = async () => {
        const { currentGrid, resolvedGrid, turn } = await initGame(
            this.props.size,
        );
        this.setState({
            currentGrid,
            isLoading: false,
            isVictory: false,
            resolvedGrid,
            turn,
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
            showTileNumbers,
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
                                resolvedGrid={resolvedGrid}
                                readOnly={isVictory}
                                tileToHighlight={suggestedTile}
                                showNumbers={showTileNumbers}
                            />
                        )}
                        <Switch
                            labels={labels}
                            onToggle={this.handleOnToggle}
                        />
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
