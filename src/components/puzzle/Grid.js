import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { defaultImageUrl, imageUrls } from '../../config';

import Tile from './Tile';

import { dirFromMove, isTileInMovableTiles } from '../../core/game';
import { associateTileToBackground, choiceInArray } from '../../core/helper';

const DURATION_TRANSLATE = 200;

const TILE_IMAGE_SIZE = 100;
const TILE_MARGIN = 2;

const buildTileSize = (imageSize, nbOfTiles) =>
    `${imageSize / (nbOfTiles + 1)}vw`;

const buildTranslateStyle = (translate, translatingDir) => {
    return translate
        ? {
              transform: `translate(calc(${translatingDir.x}), calc(${
                  translatingDir.y
              }))`,
              transition: `transform ${DURATION_TRANSLATE}ms ease-out`,
          }
        : {
              transform: 'translate(0,0)',
          };
};

const translateTile = (grid, tileValue, tileSize, tileMargin) => {
    const dir = dirFromMove(grid, tileValue);
    return {
        y: `${dir.y} * (${tileSize} + ${tileMargin})`,
        x: `${dir.x} * (${tileSize} + ${tileMargin})`,
    };
};

class Grid extends Component {
    static propTypes = {
        grid: PropTypes.array.isRequired,
        onClick: PropTypes.func.isRequired,
        readOnly: PropTypes.bool,
        resolvedGrid: PropTypes.array.isRequired,
        showNumbers: PropTypes.bool,
        tileToHighlight: PropTypes.number,
    };

    static defaultProps = {
        readOnly: true,
        showNumbers: true,
    };

    state = {
        translating: false,
        translatingDir: { y: 0, x: 0 },
        translatingTile: 0,
    };

    handleClickTile = tile => {
        const { tileSize, tileMargin, translatingTile } = this.state;
        const { grid, onClick } = this.props;

        this.setState(
            {
                translating: true,
                translatingDir: translateTile(grid, tile, tileSize, tileMargin),
                translatingTile: tile,
            },
            () => {
                setTimeout(() => {
                    this.setState({ translating: false }, () =>
                        onClick(translatingTile),
                    );
                }, DURATION_TRANSLATE);
            },
        );
    };

    componentWillMount() {
        const { resolvedGrid } = this.props;

        const imageCoords = associateTileToBackground(resolvedGrid);
        const imageUrl = choiceInArray(
            imageUrls.length > 0 ? imageUrls : [defaultImageUrl],
        );

        const imageSize = `${TILE_IMAGE_SIZE}vw`;
        const tileMargin = `${TILE_MARGIN}px`;
        const tileSize = `${buildTileSize(
            TILE_IMAGE_SIZE,
            resolvedGrid.length,
        )}`;

        this.setState({
            imageCoords,
            imageUrl,
            imageSize,
            tileMargin,
            tileSize,
        });
    }

    render() {
        const { grid, readOnly, showNumbers, tileToHighlight } = this.props;

        const {
            imageCoords,
            imageUrl,
            imageSize,
            tileSize,
            translating,
            translatingDir,
            translatingTile,
        } = this.state;

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
                                        style={{
                                            height: `${tileSize}`,
                                            margin: `${TILE_MARGIN}px`,
                                            width: `${tileSize}`,
                                        }}
                                    />
                                ) : (
                                    <Tile
                                        enabled={
                                            !readOnly &&
                                            isTileInMovableTiles(
                                                grid,
                                                tileValue,
                                            )
                                        }
                                        key={tileValue}
                                        onClick={this.handleClickTile}
                                        pulse={tileValue === tileToHighlight}
                                        showNumbers={showNumbers}
                                        style={buildTranslateStyle(
                                            translating &&
                                                translatingTile === tileValue,
                                            translatingDir,
                                        )}
                                        tileImageCoords={imageCoords[tileValue]}
                                        tileImageSize={imageSize}
                                        tileImageUrl={imageUrl}
                                        tileMargin={`${TILE_MARGIN}px`}
                                        tileSize={`calc(${tileSize})`}
                                        tileValue={tileValue}
                                    />
                                ),
                        )}
                    </div>
                ))}
            </div>
        );
    }
}

export default Grid;
