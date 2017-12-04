import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import { Link } from '../routes';

const Nav = ({ colors, title }) => {
    const navClass = ClassNames(
        colors.reduce((acc, cur) => {
            acc[cur] = cur;
            return acc;
        }, {}),
    );

    return (
        <nav className={navClass} role="navigation">
            <div className="nav-wrapper container">
                <Link route="index">
                    <a className="brand-logo">{title}</a>
                </Link>
            </div>
        </nav>
    );
};

Nav.propTypes = {
    colors: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
};

Nav.defaultProps = {
    colors: ['blue', 'lighten-1'],
    title: '15 Puzzle Isomorphic',
};

export default Nav;
