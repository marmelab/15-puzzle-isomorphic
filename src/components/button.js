import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const Button = ({ color, icon, label, path }) => {
    const buttonClass = ClassNames({
        btn: true,
        [`${color}`]: color,
    });

    return (
        <Link href={{ pathname: path }}>
            <a className={buttonClass}>
                <i className="material-icons left">{icon}</i>
                {label}
            </a>
        </Link>
    );
};

Button.propTypes = {
    color: PropTypes.string,
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
};

export default Button;
