import React from 'react';
import PropTypes from 'prop-types';

import ActivityIndicator from './activityIndicator';
import Col from './col';
import Row from './row';

const Block = ({ children, isLoading, title }) => (
    <Row className="block">
        {isLoading && (
            <Col>
                <div className="center  activity-indicator-wrapper">
                    <ActivityIndicator />
                </div>
            </Col>
        )}
        {!isLoading &&
            !React.isValidElement(children) &&
            children.map((child, key) => child && <Col key={key}>{child}</Col>)}
        {!isLoading && React.isValidElement(children) && <Col>{children}</Col>}
        {title && (
            <Col>
                <h5 className="center truncate">{title}</h5>
            </Col>
        )}
    </Row>
);

Block.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element),
    ]).isRequired,
    isLoading: PropTypes.bool,
    title: PropTypes.string,
};

Block.defaultProps = {
    isLoading: false,
    title: '',
};

export default Block;
