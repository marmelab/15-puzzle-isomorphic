import React from 'react';
import PropTypes from 'prop-types';

import Tile from './Tile';
import ChangeMargin from '../transitions/ChangeMargin';

import withImage from './withImage';

const DEFAULT_MARGIN = {
    start: '0.25em',
    end: 0,
};

const Grid = ({
    grid,
    imageCoords,
    imageUrl,
    onClick,
    readOnly,
    showNumbers,
    tileToHighlight,
}) => {
    return (
        <div className="puzzle-column flow-text">
            {grid.map((row, rowKey) => (
                <div className="puzzle-row" key={rowKey}>
                    {row.map(tileValue => {
                        const pulse = tileValue === tileToHighlight;

                        return (
                            <ChangeMargin
                                key={tileValue}
                                in={readOnly}
                                margin={DEFAULT_MARGIN}
                            >
                                {tileValue === 0 ? (
                                    <div className="puzzle-tile-empty" />
                                ) : (
                                    <Tile
                                        enabled={!readOnly}
                                        tileImage={imageUrl}
                                        tileImageCoords={imageCoords[tileValue]}
                                        onClick={onClick}
                                        showNumbers={showNumbers}
                                        tileValue={tileValue}
                                        pulse={pulse}
                                    />
                                )}
                            </ChangeMargin>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

Grid.propTypes = {
    grid: PropTypes.array.isRequired,
    imageCoords: PropTypes.object,
    imageUrl: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    readOnly: PropTypes.bool,
    showNumbers: PropTypes.bool,
    tileToHighlight: PropTypes.number,
};

Grid.defaultProps = {
    readOnly: true,
    showNumbers: true,
};

export default withImage(Grid);
