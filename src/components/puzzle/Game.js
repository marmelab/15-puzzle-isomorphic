import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from './Grid';

import { ShowWhenOnline } from '../detectOffline';
import withLoader from '../withLoader';

import Button from '../ui/Button';
import Switch from '../ui/Switch';
const LoaderButton = withLoader(Button);

import { suggestFactory } from '../../services/suggestMoveService';

const labels = {
    off: 'Hide',
    on: 'Show',
    title: 'Display the numbers',
};

export default class Game extends Component {
    static propTypes = {
        currentGrid: PropTypes.array.isRequired,
        isVictory: PropTypes.bool,
        onClickTile: PropTypes.func.isRequired,
        resolvedGrid: PropTypes.array.isRequired,
    };

    state = {
        loadingAdvice: false,
        showTileNumbers: false,
        suggestedTile: 0,
    };

    handleOnClickTile = tile => {
        this.setState({
            suggestedTile: 0,
        });
        this.props.onClickTile(tile);
    };

    handleOnToggle = toggleState => {
        this.setState({
            showTileNumbers: toggleState,
        });
    };

    requestSuggest = async () => {
        const { currentGrid, resolvedGrid } = this.props;
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

    render() {
        const { currentGrid, isVictory, resolvedGrid } = this.props;
        const { showTileNumbers, suggestedTile, loadingAdvice } = this.state;

        return (
            <div>
                <Grid
                    onClick={this.handleOnClickTile}
                    grid={currentGrid}
                    readOnly={isVictory}
                    resolvedGrid={resolvedGrid}
                    showNumbers={showTileNumbers}
                    tileToHighlight={suggestedTile}
                />
                <Switch labels={labels} onToggle={this.handleOnToggle} />
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
            </div>
        );
    }
}
