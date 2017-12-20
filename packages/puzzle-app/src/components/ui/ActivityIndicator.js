import React from 'react';
import PropTypes from 'prop-types';

const ActivityIndicator = ({ size }) => (
    <div className={`preloader-wrapper ${size} active`}>
        <div className="spinner-layer spinner-blue">
            <div className="circle-clipper left">
                <div className="circle" />
            </div>
            <div className="gap-patch">
                <div className="circle" />
            </div>
            <div className="circle-clipper right">
                <div className="circle" />
            </div>
        </div>

        <div className="spinner-layer spinner-red">
            <div className="circle-clipper left">
                <div className="circle" />
            </div>
            <div className="gap-patch">
                <div className="circle" />
            </div>
            <div className="circle-clipper right">
                <div className="circle" />
            </div>
        </div>

        <div className="spinner-layer spinner-yellow">
            <div className="circle-clipper left">
                <div className="circle" />
            </div>
            <div className="gap-patch">
                <div className="circle" />
            </div>
            <div className="circle-clipper right">
                <div className="circle" />
            </div>
        </div>

        <div className="spinner-layer spinner-green">
            <div className="circle-clipper left">
                <div className="circle" />
            </div>
            <div className="gap-patch">
                <div className="circle" />
            </div>
            <div className="circle-clipper right">
                <div className="circle" />
            </div>
        </div>
    </div>
);

ActivityIndicator.propTypes = {
    size: PropTypes.string,
};

ActivityIndicator.defaultProps = {
    size: 'big',
};

export default ActivityIndicator;
