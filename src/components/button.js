import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const Button = ({ color, icon, label, path }) => (
    <Link href={{ pathname: path }}>
        <a className={`btn ${color ? color : ''}`}>
            <i className="material-icons left">{icon}</i>
            {label}
        </a>
    </Link>
);

Button.propTypes = {
    color: PropTypes.string,
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
};

export default Button;
