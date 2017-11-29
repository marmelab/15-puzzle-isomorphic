import React from 'react';
import { Link } from '../routes';

import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const Button = ({ color, icon, label, onClick, route }) => {
    const buttonClass = ClassNames({
        btn: true,
        [color]: color,
    });

    return route ? (
        <Link href="" route={route}>
            <a className={buttonClass}>
                <i className="material-icons left">{icon}</i>
                {label}
            </a>
        </Link>
    ) : (
        <a onClick={onClick} className={buttonClass}>
            <i className="material-icons left">{icon}</i>
            {label}
        </a>
    );
};

Button.propTypes = {
    color: PropTypes.string,
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    route: PropTypes.string,
};

export default Button;
