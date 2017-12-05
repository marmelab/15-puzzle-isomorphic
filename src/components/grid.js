import React from 'react';
import PropTypes from 'prop-types';

import { defaultImageUrl } from '../config';

import Tile from './tile';

import { associateTileToBackground } from '../core/helper';

const Grid = ({ grid, onClick, resolvedGrid, readOnly, showNumbers }) => {
    const tileToBg = resolvedGrid
        ? associateTileToBackground(resolvedGrid)
        : null;

    return (
        <div className="puzzle-column flow-text">
            {grid.map((row, rowKey) => (
                <div className="puzzle-row" key={rowKey}>
                    {row.map(
                        tileValue =>
                            tileValue === 0 ? (
                                <div
                                    key={tileValue}
                                    className="puzzle-tile-empty"
                                />
                            ) : tileToBg ? (
                                <Tile
                                    key={tileValue}
                                    enabled={!readOnly}
                                    tileImage={defaultImageUrl}
                                    tileImageCoords={tileToBg[tileValue]}
                                    onClick={onClick}
                                    showNumbers={showNumbers}
                                    tileValue={tileValue}
                                />
                            ) : (
                                <Tile
                                    key={tileValue}
                                    enabled={!readOnly}
                                    onClick={onClick}
                                    showNumbers={showNumbers}
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
    resolvedGrid: PropTypes.array,
    onClick: PropTypes.func.isRequired,
    readOnly: PropTypes.bool,
    showNumbers: PropTypes.bool,
};

Grid.defaultProps = {
    readOnly: true,
    showNumbers: true,
};

export default Grid;
