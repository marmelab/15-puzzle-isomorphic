import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Item extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        icon: PropTypes.string,
        label: PropTypes.string,
        onClick: PropTypes.func,
        value: PropTypes.number,
    };

    handleClick = () => {
        const { onClick, value } = this.props;
        onClick(value);
    };

    render() {
        const { icon, label } = this.props;

        return icon ? (
            <div className="left-align">
                {label}
                <span
                    onClick={this.handleClick}
                    className="secondary-content clickable"
                >
                    <i className="material-icons">{icon}</i>
                </span>
            </div>
        ) : (
            <div className="left-align" onClick={this.handleClick}>
                {label}
            </div>
        );
    }
}
