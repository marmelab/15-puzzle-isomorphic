import React, { Component } from 'react';

import CustomHead from '../src/components/head';
import Button from '../src/components/button';
import Nav from '../src/components/nav';
import Grid from '../src/components/grid';
import ActivityIndicator from '../src/components/activityIndicator';

import { buildGrid } from '../src/core/game';

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

        this.setState({
            isLoading: false,
            currentGrid: resolvedGrid,
            resolvedGrid,
            turn: 0,
            isVictory: false,
        });
    };

    render() {
        const { isLoading, currentGrid, turn, isVictory } = this.state;

        if (isLoading) {
            return (
                <div>
                    <CustomHead />
                    <Nav />
                    <section className="container">
                        <div className="section">
                            <div className="bloc z-depth-2">
                                <div className="col s12">
                                    <h5>Building a new game</h5>
                                </div>
                                <div className="col s12">
                                    <div className="activity-indicator-wrapper">
                                        <ActivityIndicator />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="section">
                            <div className="row">
                                <div className="col s12">
                                    <Button
                                        icon="keyboard_return"
                                        label="Back to home"
                                        path="/"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            );
        }

        return (
            <div>
                <CustomHead />
                <Nav />
                <section className="container">
                    <div className="section">
                        <div className="bloc z-depth-2">
                            <div className="col s12">
                                <h5>
                                    {this.renderWinnerMessage(isVictory, turn)}
                                </h5>
                            </div>
                            <div className="col s12">
                                <Grid
                                    onClick={this.handleClick}
                                    grid={currentGrid}
                                    readOnly={isVictory}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}