import React, { Component } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default class Button extends Component {
    static propTypes = {
        color: PropTypes.string,
        icon: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
    };

    render() {
        const { color, icon, label, path } = this.props;

        return (
            <Link href={{ pathname: path }}>
                <a className={`btn ${color ? color : ''}`}>
                    <i className="material-icons left">{icon}</i>
                    {label}
                </a>
            </Link>
        );
    }
}
