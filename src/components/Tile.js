import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

export default class Tile extends PureComponent {
    static propTypes = {
        enabled: PropTypes.bool,
        onClick: PropTypes.func.isRequired,
        pulse: PropTypes.bool,
        showNumbers: PropTypes.bool,
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
        } = this.props;

        const tileClass = ClassNames({
            pulse: pulse,
            'puzzle-tile': true,
            'puzzle-tile-hover': enabled,
            'z-depth-3': enabled,
        });

        const style =
            tileImage && tileImageCoords
                ? {
                      backgroundImage: `url(${tileImage})`,
                      backgroundPosition: tileImageCoords,
                  }
                : {};

        return (
            <div className={tileClass} style={style} onClick={this.handleClick}>
                {showNumbers && (
                    <span className="puzzle-tile-value">{tileValue}</span>
                )}
            </div>
        );
    }
}
