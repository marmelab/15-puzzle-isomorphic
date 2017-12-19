import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import { Link } from '../../routes';

const Button = ({ className, color, icon, label, onClick, route, style }) => {
    const buttonClass = ClassNames('btn', color ? color : '', className);

    if (route) {
        return (
            <Link href="" route={route}>
                <a className={buttonClass} title={label} style={style}>
                    <i className="material-icons left">{icon}</i>
                    {label}
                </a>
            </Link>
        );
    }
    return (
        <a
            onClick={onClick}
            className={buttonClass}
            title={label}
            style={style}
        >
            <i className="material-icons left">{icon}</i>
            {label}
        </a>
    );
};

Button.propTypes = {
    className: PropTypes.string,
    color: PropTypes.string,
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    route: PropTypes.string,
    style: PropTypes.object,
};

export default Button;
