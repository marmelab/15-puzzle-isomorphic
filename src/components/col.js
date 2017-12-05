import React from 'react';
import PropTypes from 'prop-types';

const Col = ({ children }) => <div className="col s12">{children}</div>;

Col.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element),
    ]).isRequired,
};

export default Col;
