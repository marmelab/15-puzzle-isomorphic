import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';

export default class Nav extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
    };

    render() {
        const { title } = this.props;
        return (
            <nav className="blue lighten-1" role="navigation">
                <div className="nav-wrapper container">
                    <Link href="/">
                        <a className="brand-logo">{title}</a>
                    </Link>
                </div>
            </nav>
        );
    }
}
