import React from 'react';
import { Link } from '../routes';

import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const Button = ({ className, color, icon, label, onClick, route }) => {
    const buttonClass = ClassNames(
        {
            btn: true,
            [color]: color,
            'waves-effect': true,
            'waves-light': true,
        },
        className,
    );

    if (route) {
        return (
            <Link href="" route={route}>
                <a className={buttonClass} title={label}>
                    <i className="material-icons left">{icon}</i>
                    {label}
                </a>
            </Link>
        );
    }
    return (
        <a onClick={onClick} className={buttonClass} title={label}>
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
};

export default Button;
