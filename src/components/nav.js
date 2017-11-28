import React from 'react';
import PropTypes from 'prop-types';

import { Link } from '../routes';

const Nav = ({ title }) => (
    <nav className="blue lighten-1" role="navigation">
        <div className="nav-wrapper container">
            <Link route="index">
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
