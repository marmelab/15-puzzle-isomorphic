import React from 'react';
import PropTypes from 'prop-types';

import Tile from './tile';

const Grid = ({ grid, readOnly, onClick }) => (
    <div className="puzzle-column">
        {grid.map((row, rowKey) => {
            return (
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
                                    onClick={onClick}
                                    tileValue={tileValue}
                                />
                            ),
                    )}
                </div>
            );
        })}
    </div>
);

Grid.propTypes = {
    onClick: PropTypes.func.isRequired,
    grid: PropTypes.array.isRequired,
    readOnly: PropTypes.bool,
};

Grid.defaultProps = {
    readOnly: true,
};

export default Grid;
