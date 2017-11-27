import React from 'react';
import PropTypes from 'prop-types';

const Tile = ({ enabled, onClick, tileValue }) => {
    const handleClick = () => {
        if (enabled) {
            onClick(tileValue);
        }
    };

    return (
        <div
            className={`puzzle-tile ${
                enabled ? 'puzzle-tile-hover z-depth-3' : ''
            }`}
            onClick={handleClick}
        >
            <span className="puzzle-tile-value">{tileValue}</span>
        </div>
    );
};

Tile.propTypes = {
    enabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    tileValue: PropTypes.number.isRequired,
};

Tile.defaultProps = {
    enabled: true,
};

export default Tile;
