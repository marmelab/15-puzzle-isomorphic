import React from 'react';
import PropTypes from 'prop-types';

import Col from './Col';
import Row from './Row';

import withLoader from './withLoader';

const Block = ({ children, title }) => (
    <Row>
        {!React.Children.count(children) === 1 &&
            children.map((child, key) => child && <Col key={key}>{child}</Col>)}
        {React.Children.count(children) > 1 && <Col>{children}</Col>}
        {title && (
            <Col>
                <h5 className="center">{title}</h5>
            </Col>
        )}
    </Row>
);

Block.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element),
    ]).isRequired,
    title: PropTypes.string,
};

Block.defaultProps = {
    title: '',
};

export default withLoader(Block);
