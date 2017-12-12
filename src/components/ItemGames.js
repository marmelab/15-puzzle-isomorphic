import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class ItemGames extends PureComponent {
    static propTypes = {
        onClick: PropTypes.func,
        value: PropTypes.number,
    };

    handleClick = () => {
        const { onClick, value } = this.props;
        onClick(value);
    };

    render() {
        const { value } = this.props;

        return (
            <div className="left-align">
                Game #{value}
                <span
                    onClick={this.handleClick}
                    className="secondary-content clickable"
                >
                    <i className="material-icons">add_circle_outline</i>
                </span>
            </div>
        );
    }
}
