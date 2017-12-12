import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tile from './Tile';
import { translateTile } from '../../core/main';

import withImage from './withImage';

const DURATION_TRANSLATE = 200;
const SIZE_TILE = 5.5;

export const buildTranslateStyle = (translate, translatingDir) => {
    return translate
        ? {
              transform: `translate(${translatingDir.x}em, ${
                  translatingDir.y
              }em)`,
              transition: `transform ${DURATION_TRANSLATE} ease-out`,
          }
        : {
              transform: 'translate(0,0)',
          };
};

class Grid extends Component {
    static propTypes = {
        grid: PropTypes.array.isRequired,
        imageUrl: PropTypes.string,
        imageCoords: PropTypes.object,
        onClick: PropTypes.func.isRequired,
        readOnly: PropTypes.bool,
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
        }, 200);
    };

    render() {
        const {
            grid,
            imageCoords,
            imageUrl,
            readOnly,
            showNumbers,
            tileToHighlight,
        } = this.props;

        const { translating, translatingDir, translatingTile } = this.state;

        return (
            <div className="puzzle-column flow-text">
                {grid.map((row, rowKey) => (
                    <div className="puzzle-row" key={rowKey}>
                        {row.map(tileValue => {
                            const pulse = tileValue === tileToHighlight;
                            const translate =
                                translating && translatingTile === tileValue;

                            return tileValue === 0 ? (
                                <div className="puzzle-tile-empty" />
                            ) : (
                                <Tile
                                    style={buildTranslateStyle(
                                        translate,
                                        translatingDir,
                                    )}
                                    enabled={!readOnly}
                                    tileImage={imageUrl}
                                    tileImageCoords={imageCoords[tileValue]}
                                    onClick={this.handleClickTile}
                                    showNumbers={showNumbers}
                                    tileValue={tileValue}
                                    pulse={pulse}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        );
    }
}

export default withImage(Grid);
