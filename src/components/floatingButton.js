import React from 'react';
import PropTypes from 'prop-types';

const FloatingButton = ({ children, color, icon }) => {
    return (
        <div className="fixed-action-btn">
            <a className={`btn-floating btn-large ${color} pulse`}>
                <i className="large material-icons">{icon}</i>
            </a>
            <ul>{children}</ul>
        </div>
    );
};

FloatingButton.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    color: PropTypes.string,
    icon: PropTypes.string,
};

FloatingButton.defaultProps = {
    color: 'red',
    icon: 'add',
};

export default FloatingButton;
