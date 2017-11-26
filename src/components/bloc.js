import React from 'react';
import PropTypes from 'prop-types';

const Bloc = ({ children, title }) => (
    <div className="bloc z-depth-3">
        {title && (
            <div className="col s12">
                <h5>{title}</h5>
            </div>
        )}
        <div className="col s12">{children}</div>
    </div>
);

Bloc.propTypes = {
    children: PropTypes.element.isRequired,
    title: PropTypes.string,
};

export default Bloc;
