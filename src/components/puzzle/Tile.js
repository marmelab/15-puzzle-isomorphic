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
        tileImage: PropTypes.string,
        tileImageCoords: PropTypes.string,
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
            tileImage,
            tileImageCoords,
            tileValue,
            style,
        } = this.props;

        const tileClass = ClassNames('puzzle-tile', 'z-depth-3', {
            pulse: pulse,
            'puzzle-tile-hover': enabled,
        });

        const tileStyle =
            tileImage && tileImageCoords
                ? {
                      backgroundImage: `url(${tileImage})`,
                      backgroundPosition: tileImageCoords,
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
