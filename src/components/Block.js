import React from 'react';
import PropTypes from 'prop-types';

import Row from './Row';

import withLoader from './withLoader';

const Block = ({ children, title }) => (
    <Row>
        {children}
        {title && <h5 className="center">{title}</h5>}
    </Row>
);

Block.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
    title: PropTypes.string,
};

Block.defaultProps = {
    title: null,
};

export default withLoader(Block);
