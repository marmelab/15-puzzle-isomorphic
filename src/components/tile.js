import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Tile extends Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
        tileValue: PropTypes.number.isRequired,
        enabled: PropTypes.bool,
    };

    static defaultProps = {
        enabled: true,
    };

    handleClick = () => {
        const { enabled, tileValue, onClick } = this.props;
        if (enabled) {
            onClick(tileValue);
        }
    };

    render() {
        const { enabled, tileValue } = this.props;

        return (
            <div
                className={`puzzle-tile ${enabled ? 'z-depth-3' : ''}`}
                onClick={this.handleClick}
            >
                <span className="puzzle-tile-value">{tileValue}</span>
            </div>
        );
    }
}
