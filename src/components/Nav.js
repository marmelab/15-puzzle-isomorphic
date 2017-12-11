import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import { Link, Router } from '../routes';

const Nav = ({ colors, title }) => {
    const navClass = ClassNames(colors);

    return (
        <nav className={navClass} role="navigation">
            <div className="nav-wrapper container">
                {Router.route === '/' && (
                    <Link route="index">
                        <a className="brand-logo nav-brand-responsive truncate">
                            {title}
                        </a>
                    </Link>
                )}
                {Router.route !== '/' && (
                    <a
                        onClick={Router.back}
                        className="brand-logo nav-brand-responsive truncate"
                    >
                        <i className="material-icons">arrow_back</i>
                        {title}
                    </a>
                )}
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
