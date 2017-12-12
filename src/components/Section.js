import React from 'react';
import PropTypes from 'prop-types';

const Section = ({ children }) => (
    <div className="section center">{children}</div>
);

Section.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element),
    ]).isRequired,
};

export default Section;
