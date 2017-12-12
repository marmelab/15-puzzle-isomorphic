import React from 'react';
import PropTypes from 'prop-types';

import Col from './Col';

const Row = ({ children }) => (
    <div className="row">
        {React.Children.count(children) === 1 ? (
            <Col>{children}</Col>
        ) : (
            children.map((child, key) => child && <Col key={key}>{child}</Col>)
        )}
    </div>
);

Row.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
};

export default Row;
