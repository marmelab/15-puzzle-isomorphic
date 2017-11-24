import React from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';

const Nav = ({ title }) => (
    <nav className="blue lighten-1" role="navigation">
        <div className="nav-wrapper container">
            <Link href="/">
                <a className="brand-logo">{title}</a>
            </Link>
        </div>
    </nav>
);

Nav.propTypes = {
    title: PropTypes.string.isRequired,
};

Nav.defaultProps = {
    title: '15 Puzzle Isomorphic!',
};

export default Nav;
