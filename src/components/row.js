import React from 'react';
import PropTypes from 'prop-types';

const Row = ({ children }) => (
    <div className="row">
        <div className="col s12">{children}</div>
    </div>
);

Row.propTypes = {
    children: PropTypes.element.isRequired,
};

export default Row;
