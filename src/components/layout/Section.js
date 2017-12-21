import React from 'react';
import PropTypes from 'prop-types';

const Section = ({ children }) => (
    <div className="section center">{children}</div>
);

Section.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
};

export default Section;
