import React from 'react';
import PropTypes from 'prop-types';

import ActivityIndicator from './activityIndicator';
import Col from './col';

const Bloc = ({ children, isLoading, title }) => (
    <div className="bloc z-depth-3 flow-text">
        {title && (
            <Col>
                <h5 className="truncate">{title}</h5>
            </Col>
        )}
        <Col>
            {isLoading && (
                <div className="activity-indicator-wrapper">
                    <ActivityIndicator />
                </div>
            )}
            {!isLoading && children}
        </Col>
    </div>
);

Bloc.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element),
    ]).isRequired,
    isLoading: PropTypes.bool,
    title: PropTypes.string,
};

Bloc.defaultProps = {
    isLoading: false,
    title: '',
};

export default Bloc;
