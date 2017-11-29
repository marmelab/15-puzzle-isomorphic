import React from 'react';
import { Link } from '../routes';

import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const Button = ({ color, icon, label, route }) => {
    const buttonClass = ClassNames({
        btn: true,
        [color]: color,
    });

    return (
        <Link href="" route={route}>
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
    route: PropTypes.string.isRequired,
};

export default Button;
