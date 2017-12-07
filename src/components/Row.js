import React from 'react';
import PropTypes from 'prop-types';

const Row = ({ children }) => (
    <div className="row">
        {!React.isValidElement(children) && children.map(child => child)}
        {React.isValidElement(children) && children}
    </div>
);

Row.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element),
    ]).isRequired,
};

export default Row;
