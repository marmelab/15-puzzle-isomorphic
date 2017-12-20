import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';

import { defaultImageUrl, imageUrls, translateDuration } from '../../config';
import * as GridStyle from '../../gridStyleCalculator';

import Tile from './Tile';
import TileEmpty from './TileEmpty';

import {
    associateTileToBackground,
    choiceInArray,
    isTileInMovableTiles,
} from 'core';

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
        }, translateDuration);
    };

    componentWillMount() {
        const { resolvedGrid } = this.props;

        const imageCoords = associateTileToBackground(resolvedGrid);
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
        const { imageCoords, imageUrl, tileTranslating } = this.state;

        return (
            <Media query="(max-width: 800px)">
                {matches => {
                    const {
                        dimensionStyle,
                        tileSize,
                    } = GridStyle.buildResponsiveDimension(
                        matches,
                        grid.length,
                    );
                    return (
                        <div className="puzzle-column flow-text">
                            {grid.map((row, rowKey) => (
                                <div className="puzzle-row" key={rowKey}>
                                    {row.map(tileValue => {
                                        const backgroundStyle = GridStyle.buildResponsiveBackground(
                                            matches,
                                            grid.length,
                                            imageUrl,
                                            imageCoords[tileValue],
                                            tileSize,
                                        );
                                        let enabled = false;
                                        let translate = false;
                                        let translateStyle = {};
                                        if (
                                            !readOnly &&
                                            isTileInMovableTiles(
                                                grid,
                                                tileValue,
                                            )
                                        ) {
                                            enabled = true;
                                            translate =
                                                tileTranslating === tileValue;
                                            translateStyle = GridStyle.buildResponsiveTranslate(
                                                matches,
                                                grid,
                                                tileSize,
                                                tileValue,
                                            );
                                        }
                                        return tileValue === 0 ? (
                                            <TileEmpty
                                                dimensionStyle={dimensionStyle}
                                                key={0}
                                            />
                                        ) : (
                                            <Tile
                                                backgroundStyle={
                                                    backgroundStyle
                                                }
                                                dimensionStyle={dimensionStyle}
                                                enabled={enabled}
                                                imageCoords={
                                                    imageCoords[tileValue]
                                                }
                                                imageUrl={imageUrl}
                                                key={tileValue}
                                                nbTiles={grid.length}
                                                onClick={this.handleOnClick}
                                                pulse={
                                                    tileValue ===
                                                    tileToHighlight
                                                }
                                                showNumbers={showNumbers}
                                                translate={translate}
                                                translateStyle={translateStyle}
                                                tileSize={tileSize}
                                                tileValue={tileValue}
                                            />
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    );
                }}
            </Media>
        );
    }
}
