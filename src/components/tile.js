import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const Tile = ({ enabled, onClick, tileImage, tileImageCoords, tileValue }) => {
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

    const style =
        tileImage && tileImageCoords
            ? {
                  backgroundImage: `url(${tileImage})`,
                  backgroundPosition: tileImageCoords,
              }
            : {};

    return (
        <div className={tileClass} style={style} onClick={handleClick}>
            <span className="puzzle-tile-value">{tileValue}</span>
        </div>
    );
};

Tile.propTypes = {
    enabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    tileImage: PropTypes.string,
    tileImageCoords: PropTypes.string,
    tileValue: PropTypes.number.isRequired,
};

Tile.defaultProps = {
    enabled: true,
};

export default Tile;
