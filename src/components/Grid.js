import React from 'react';
import PropTypes from 'prop-types';

import { defaultImageUrl } from '../config';

import Tile from './Tile';

import { associateTileToBackground } from '../core/helper';

const Grid = ({
    grid,
    imageUrl,
    onClick,
    resolvedGrid,
    readOnly,
    showNumbers,
    tileToHighlight,
}) => {
    const tileToBg = resolvedGrid
        ? associateTileToBackground(resolvedGrid)
        : null;

    return (
        <div className="puzzle-column flow-text">
            {grid.map((row, rowKey) => (
                <div className="puzzle-row" key={rowKey}>
                    {row.map(tileValue => {
                        const pulse = tileValue === tileToHighlight;

                        return tileValue === 0 ? (
                            <div
                                key={tileValue}
                                className="puzzle-tile-empty"
                            />
                        ) : tileToBg ? (
                            <Tile
                                key={tileValue}
                                enabled={!readOnly}
                                tileImage={imageUrl}
                                tileImageCoords={tileToBg[tileValue]}
                                onClick={onClick}
                                showNumbers={showNumbers}
                                tileValue={tileValue}
                                pulse={pulse}
                            />
                        ) : (
                            <Tile
                                key={tileValue}
                                enabled={!readOnly}
                                onClick={onClick}
                                showNumbers={showNumbers}
                                tileValue={tileValue}
                                pulse={pulse}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

Grid.propTypes = {
    grid: PropTypes.array.isRequired,
    imageUrl: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    readOnly: PropTypes.bool,
    resolvedGrid: PropTypes.array,
    showNumbers: PropTypes.bool,
    tileToHighlight: PropTypes.number,
};

Grid.defaultProps = {
    imageUrl: defaultImageUrl,
    readOnly: true,
    showNumbers: true,
};

export default Grid;
