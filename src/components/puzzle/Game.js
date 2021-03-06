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
        suggestedTile: PropTypes.number,
    };

    static defaultProps = {
        suggestedTile: 0,
    };

    state = {
        loadingAdvice: false,
        showTileNumbers: false,
    };

    handleOnToggle = toggleState => {
        this.setState({
            showTileNumbers: toggleState,
        });
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

    render() {
        const {
            currentGrid,
            isVictory,
            onClickTile,
            resolvedGrid,
            suggestedTile,
        } = this.props;
        const { showTileNumbers, loadingAdvice } = this.state;

        return (
            <div>
                {currentGrid && (
                    <Grid
                        onClick={onClickTile}
                        grid={currentGrid}
                        readOnly={isVictory}
                        resolvedGrid={resolvedGrid}
                        showNumbers={showTileNumbers}
                        tileToHighLight={suggestedTile}
                    />
                )}
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
