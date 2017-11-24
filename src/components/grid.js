import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tile from './tile';

export default class Grid extends Component {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        grid: PropTypes.array.isRequired,
        readOnly: PropTypes.bool,
    };

    static defaultProps = {
        readOnly: true,
    };

    render() {
        const { grid, readOnly, onPress } = this.props;

        return (
            <div className="column">
                {grid.map((row, rowKey) => {
                    return (
                        <div className="row" key={rowKey}>
                            {row.map(tileValue => {
                                if (tileValue === 0) {
                                    return (
                                        <div
                                            key={tileValue}
                                            className="puzzle-tile-empty"
                                        />
                                    );
                                }
                                return (
                                    <Tile
                                        key={tileValue}
                                        tileValue={tileValue}
                                        enabled={!readOnly}
                                        onPress={onPress}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }
}
