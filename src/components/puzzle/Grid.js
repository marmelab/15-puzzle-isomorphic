import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { defaultImageUrl, durationTranslate, imageUrls } from '../../config';

import Tile from './Tile';
import TileEmpty from './TileEmpty';

import { isTileInMovableTiles } from '../../core/game';
import { associateTileToBackground, choiceInArray } from '../../core/helper';

const TILE_MARGIN = 2;
const TILE_IMAGE_SIZE = 100;

const buildTileStyle = (tileImageUrl, tileImageCoords, tileImageSize) => {
    return {
        backgroundImage: `url(${tileImageUrl})`,
        backgroundPosition: tileImageCoords,
        backgroundSize: `${tileImageSize}`,
    };
};

const buildTileSize = (imageSize, nbOfTiles) => imageSize / (nbOfTiles + 1);

export default class Grid extends Component {
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
        tileTranslating: 0,
    };

    handleOnClick = tile => {
        this.setState({
            tileTranslating: tile,
        });

        setTimeout(() => {
            this.setState({
                tileTranslating: 0,
            });
            this.props.onClick(tile);
        }, durationTranslate);
    };

    componentWillMount() {
        const { resolvedGrid } = this.props;

        const imageCoords = associateTileToBackground(resolvedGrid);
        const imageUrl = choiceInArray(
            imageUrls.length > 0 ? imageUrls : [defaultImageUrl],
        );
        const imageSize = `${TILE_IMAGE_SIZE}vw`;
        const tileMargin = TILE_MARGIN;
        const tileSize = buildTileSize(TILE_IMAGE_SIZE, resolvedGrid.length);

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
            imageSize,
            imageUrl,
            tileMargin,
            tileSize,
            tileTranslating,
        } = this.state;

        return (
            <div className="puzzle-column flow-text">
                {grid.map((row, rowKey) => (
                    <div className="puzzle-row" key={rowKey}>
                        {row.map(
                            tileValue =>
                                tileValue === 0 ? (
                                    <TileEmpty
                                        key={0}
                                        tileMargin={tileMargin}
                                        tileSize={tileSize}
                                        tileValue={tileValue}
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
                                        grid={grid}
                                        key={tileValue}
                                        nbOfTiles={grid.length}
                                        onClick={this.handleOnClick}
                                        pulse={tileValue === tileToHighlight}
                                        showNumbers={showNumbers}
                                        shouldTranslate={
                                            tileValue === tileTranslating
                                        }
                                        style={buildTileStyle(
                                            imageUrl,
                                            imageCoords[tileValue],
                                            imageSize,
                                        )}
                                        tileMargin={tileMargin}
                                        tileSize={tileSize}
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
