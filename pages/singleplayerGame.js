import React, { Component } from 'react';

import { defaultPuzzleSize } from '../src/config';

import { initGame, moveTile } from '../src/core/game';

import Block from '../src/components/layout/Block';
import Page from '../src/components/layout/Page';
import Section from '../src/components/layout/Section';
import Game from '../src/components/puzzle/Game';

import ChangeSizeModal from '../src/components/puzzle/ChangeSizeModal';

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
        size: 4,
        turn: -1,
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
        this.setState({
            isLoading: true,
        });
        const { currentGrid, resolvedGrid, turn } = await initGame(
            this.state.size,
        );
        this.setState({
            currentGrid,
            isLoading: false,
            isVictory: false,
            resolvedGrid,
            turn,
        });
    };

    handleOnCloseModal = newSize => {
        if (!Number.isInteger(newSize)) {
            return;
        }
        this.setState({ size: newSize });
        this.buildGame();
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
            size,
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
                    {turn <= 0 && (
                        <ChangeSizeModal
                            onClose={this.handleOnCloseModal}
                            size={size}
                        />
                    )}
                </Section>
            </Page>
        );
    }
}
