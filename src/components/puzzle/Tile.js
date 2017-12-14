import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import Fade from '../transitions/Fade';

export default class Tile extends PureComponent {
    static propTypes = {
        enabled: PropTypes.bool,
        onClick: PropTypes.func.isRequired,
        pulse: PropTypes.bool,
        showNumbers: PropTypes.bool,
        style: PropTypes.object,
        tileImageCoords: PropTypes.string,
        tileImageSize: PropTypes.string,
        tileImageUrl: PropTypes.string,
        tileMargin: PropTypes.string,
        tileSize: PropTypes.string,
        tileValue: PropTypes.number.isRequired,
    };

    static defaultProps = {
        enabled: true,
        pulse: false,
        showNumbers: true,
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
            pulse,
            showNumbers,
            tileImageCoords,
            tileImageUrl,
            tileImageSize,
            tileMargin,
            tileSize,
            tileValue,
            style,
        } = this.props;

        const tileClass = ClassNames('puzzle-tile', 'z-depth-3', {
            pulse: pulse,
            'puzzle-tile-hover': enabled,
        });

        const tileStyle =
            tileImageUrl && tileImageCoords
                ? {
                      backgroundImage: `url(${tileImageUrl})`,
                      backgroundPosition: tileImageCoords,
                      backgroundSize: `${tileImageSize}`,
                      height: `${tileSize}`,
                      margin: `${tileMargin}`,
                      width: `${tileSize}`,
                      ...style,
                  }
                : {
                      ...style,
                  };

        return (
            <div
                className={tileClass}
                style={tileStyle}
                onClick={this.handleClick}
            >
                <Fade in={showNumbers}>
                    <span className="puzzle-tile-value">{tileValue}</span>
                </Fade>
            </div>
        );
    }
}
