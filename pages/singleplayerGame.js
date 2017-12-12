import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { defaultPuzzleSize } from '../src/config';

import Block from '../src/components/layout/Block';
import Page from '../src/components/layout/Page';
import Section from '../src/components/layout/Section';

import Game from '../src/components/puzzle/Game';

import { initGame, moveTile } from '../src/core/main';

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

export default class SinglePlayerGame extends Component {
    state = {
        currentGrid: [],
        isLoading: true,
        isVictory: false,
        resolvedGrid: [],
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
                        <Game
                            currentGrid={currentGrid}
                            isVictory={isVictory}
                            onClickTile={this.handleClickTile}
                            resolvedGrid={resolvedGrid}
                            suggestedTile={suggestedTile}
                        />
                    </Block>
                </Section>
            </Page>
        );
    }
}
