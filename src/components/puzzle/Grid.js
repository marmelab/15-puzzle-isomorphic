import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { defaultImageUrl, imageUrls } from '../../config';

import Tile from './Tile';

import { dirFromMove, isTileInMovableTiles } from '../../core/game';
import { associateTileToBackground, choiceInArray } from '../../core/helper';

const DURATION_TRANSLATE = 200;
const SIZE_TILE = 5.5;

const buildTranslateStyle = (translate, translatingDir) => {
    return translate
        ? {
              transform: `translate(${translatingDir.x}em, ${
                  translatingDir.y
              }em)`,
              transition: `transform ${DURATION_TRANSLATE}ms ease-out`,
          }
        : {
              transform: 'translate(0,0)',
          };
};

const translateTile = (grid, tile, tileSize) => {
    const dir = dirFromMove(grid, tile);
    return {
        y: dir.y * tileSize,
        x: dir.x * tileSize,
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
        const dir = translateTile(this.props.grid, tile, SIZE_TILE);
        this.setState({
            translating: true,
            translatingDir: dir,
            translatingTile: tile,
        });

        setTimeout(() => {
            this.props.onClick(this.state.translatingTile);
            this.setState({ translating: false });
        }, DURATION_TRANSLATE);
    };

    componentWillMount() {
        const imageCoords = associateTileToBackground(this.props.resolvedGrid);
        const imageUrl = choiceInArray(
            imageUrls.length > 0 ? imageUrls : [defaultImageUrl],
        );

        this.setState({
            imageCoords,
            imageUrl,
        });
    }

    render() {
        const { grid, readOnly, showNumbers, tileToHighlight } = this.props;

        const {
            imageCoords,
            imageUrl,
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
                                        tileImage={imageUrl}
                                        tileImageCoords={imageCoords[tileValue]}
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
