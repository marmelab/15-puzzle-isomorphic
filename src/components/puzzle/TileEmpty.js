import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';

export default class TileEmpty extends PureComponent {
    static propTypes = {
        tileMargin: PropTypes.number.isRequired,
        tileSize: PropTypes.number.isRequired,
        tileValue: PropTypes.number.isRequired,
    };

    render() {
        const { tileMargin, tileSize } = this.props;

        return (
            <Media query="(max-width: 600px)">
                {matches =>
                    matches ? (
                        <div
                            className="puzzle-tile-empty"
                            style={{
                                height: `calc(${tileSize}vw)`,
                                margin: `${tileMargin}px`,
                                width: `calc(${tileSize}vw)`,
                            }}
                        />
                    ) : (
                        <div
                            className="puzzle-tile-empty"
                            style={{
                                height: '100px',
                                margin: '2px',
                                width: '100px',
                            }}
                        />
                    )
                }
            </Media>
        );
    }
}
