import React from 'react';
import PropTypes from 'prop-types';

import Tile from './tile';

import { associateTileToBackground } from '../core/helper';

// TODO Put the url in the config
const url = '/static/images/panda.jpg';

const Grid = ({ grid, onClick, resolvedGrid, readOnly }) => {
    const tileToBg = associateTileToBackground(resolvedGrid);

    return (
        <div className="puzzle-column">
            {grid.map((row, rowKey) => (
                <div className="puzzle-row" key={rowKey}>
                    {row.map(
                        tileValue =>
                            tileValue === 0 ? (
                                <div
                                    key={tileValue}
                                    className="puzzle-tile-empty"
                                />
                            ) : (
                                <Tile
                                    key={tileValue}
                                    enabled={!readOnly}
                                    tileImage={url}
                                    tileImageCoords={tileToBg[tileValue]}
                                    onClick={onClick}
                                    tileValue={tileValue}
                                />
                            ),
                    )}
                </div>
            ))}
        </div>
    );
};

Grid.propTypes = {
    grid: PropTypes.array.isRequired,
    resolvedGrid: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    readOnly: PropTypes.bool,
};

Grid.defaultProps = {
    readOnly: true,
};

export default Grid;
