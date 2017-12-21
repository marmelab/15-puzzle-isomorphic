import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import Fade from '../transitions/Fade';

export default class Tile extends Component {
    static propTypes = {
        backgroundStyle: PropTypes.object.isRequired,
        dimensionStyle: PropTypes.object.isRequired,
        enabled: PropTypes.bool,
        onClick: PropTypes.func.isRequired,
        pulse: PropTypes.bool,
        showNumbers: PropTypes.bool,
        translate: PropTypes.bool,
        translateStyle: PropTypes.object,
        tileSize: PropTypes.number.isRequired,
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

    shouldComponentUpdate = nextProps => {
        const { enabled, pulse, showNumbers, tileSize, translate } = this.props;

        return (
            nextProps.enabled !== enabled ||
            nextProps.pulse !== pulse ||
            nextProps.showNumbers !== showNumbers ||
            nextProps.tileSize !== tileSize ||
            nextProps.translate !== translate
        );
    };

    render() {
        const {
            enabled,
            dimensionStyle,
            backgroundStyle,
            pulse,
            showNumbers,
            translate,
            translateStyle,
            tileValue,
        } = this.props;

        const tileClass = ClassNames('puzzle-tile', 'z-depth-3', {
            pulse: pulse,
            'puzzle-tile-hover': enabled,
        });

        const style = {
            ...backgroundStyle,
            ...dimensionStyle,
        };
        Object.assign(style, translate ? translateStyle : {});

        return (
            <div className={tileClass} style={style} onClick={this.handleClick}>
                <Fade in={showNumbers}>
                    <span className="puzzle-tile-value">{tileValue}</span>
                </Fade>
            </div>
        );
    }
}
