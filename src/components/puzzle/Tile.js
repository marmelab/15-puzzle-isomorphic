import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import Media from 'react-media';

import { durationTranslate } from '../../config';

import Fade from '../transitions/Fade';

import { dirFromMove } from '../../core/game';

const defaultTransitionStyle = {
    transition: `transform ${durationTranslate}ms ease-out`,
};

const MAX_TILE_SIZE = 100;

const maxTileSizeStyle = nbTiles => ({
    backgroundSize: `${(nbTiles + 1) * MAX_TILE_SIZE}px`,
    height: `${MAX_TILE_SIZE}px`,
    width: `${MAX_TILE_SIZE}px`,
});

const buildTranslateStyle = (
    grid,
    tileMargin,
    tileSize,
    tileValue,
    unit = 'vw',
) => {
    const dir = dirFromMove(grid, tileValue);
    const translatingDir = {
        y: `${dir.y} * (${tileSize}${unit} + ${tileMargin}px)`,
        x: `${dir.x} * (${tileSize}${unit} + ${tileMargin}px)`,
    };
    return {
        transform: `translate(calc(${translatingDir.x}), calc(${
            translatingDir.y
        }))`,
    };
};

export default class Tile extends Component {
    static propTypes = {
        enabled: PropTypes.bool,
        grid: PropTypes.array.isRequired,
        nbOfTiles: PropTypes.number.isRequired,
        onClick: PropTypes.func.isRequired,
        pulse: PropTypes.bool,
        shouldTranslate: PropTypes.bool,
        showNumbers: PropTypes.bool,
        style: PropTypes.object,
        tileMargin: PropTypes.number.isRequired,
        tileSize: PropTypes.number.isRequired,
        tileValue: PropTypes.number.isRequired,
    };

    static defaultProps = {
        enabled: true,
        pulse: false,
        shouldTranslate: false,
        showNumbers: true,
        style: {},
        tileSize: maxTileSizeStyle.width,
    };

    handleClick = () => {
        const { enabled, onClick, tileValue } = this.props;

        if (enabled) {
            onClick(tileValue);
        }
    };

    render() {
        const {
            enabled,
            grid,
            nbOfTiles,
            pulse,
            showNumbers,
            style,
            tileMargin,
            tileSize,
            tileValue,
            shouldTranslate,
        } = this.props;

        const tileClass = ClassNames('puzzle-tile', 'z-depth-3', {
            pulse: pulse,
            'puzzle-tile-hover': enabled,
        });

        let tileSizeStyle = {
            height: `calc(${tileSize}vw)`,
            width: `calc(${tileSize}vw)`,
        };

        return (
            <Media query="(max-width: 800px)">
                {matches => {
                    let transitionStyle = Object.assign(
                        {
                            margin: `${tileMargin}px`,
                        },
                        shouldTranslate
                            ? {
                                  ...defaultTransitionStyle,
                                  ...buildTranslateStyle(
                                      grid,
                                      tileMargin,
                                      matches ? tileSize : MAX_TILE_SIZE,
                                      tileValue,
                                      matches ? 'vw' : 'px',
                                  ),
                              }
                            : {},
                        style,
                        matches ? tileSizeStyle : maxTileSizeStyle(nbOfTiles),
                    );
                    return (
                        <div
                            className={tileClass}
                            style={transitionStyle}
                            onClick={this.handleClick}
                        >
                            <Fade in={showNumbers}>
                                <span className="puzzle-tile-value">
                                    {tileValue}
                                </span>
                            </Fade>
                        </div>
                    );
                }}
            </Media>
        );
    }
}
