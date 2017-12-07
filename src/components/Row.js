import React from 'react';
import PropTypes from 'prop-types';

import Col from './Col';

const Row = ({ children }) => (
    <div className="row">
        {React.Children.count(children) > 1 &&
            children.map((child, key) => child && <Col key={key}>{child}</Col>)}
        {React.Children.count(children) === 1 && <Col>{children}</Col>}
    </div>
);

Row.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element),
    ]).isRequired,
};

export default Row;
