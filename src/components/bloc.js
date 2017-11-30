import React from 'react';
import PropTypes from 'prop-types';

import ActivityIndicator from './activityIndicator';

const Bloc = ({ children, isLoading, title }) => (
    <div className="bloc z-depth-3">
        {title && (
            <div className="col s12">
                <h5>{title}</h5>
            </div>
        )}
        <div className="col s12">
            {isLoading && (
                <div className="activity-indicator-wrapper">
                    <ActivityIndicator />
                </div>
            )}
            {!isLoading && children}
        </div>
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
