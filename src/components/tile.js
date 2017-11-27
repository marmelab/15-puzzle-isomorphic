import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const Tile = ({ enabled, onClick, tileValue }) => {
    const handleClick = () => {
        if (enabled) {
            onClick(tileValue);
        }
    };
    const tileClass = ClassNames({
        'puzzle-tile': true,
        'puzzle-tile-hover': enabled,
        'z-depth-3': enabled,
    });

    return (
        <div className={tileClass} onClick={handleClick}>
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
