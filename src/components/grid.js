import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tile from './tile';

export default class Grid extends Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
        grid: PropTypes.array.isRequired,
        readOnly: PropTypes.bool,
    };

    static defaultProps = {
        readOnly: true,
    };

    render() {
        const { grid, readOnly, onClick } = this.props;

        return (
            <div className="puzzle-column">
                {grid.map((row, rowKey) => {
                    return (
                        <div className="puzzle-row" key={rowKey}>
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
                                        enabled={!readOnly}
                                        onClick={onClick}
                                        tileValue={tileValue}
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
