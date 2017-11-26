import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ alt, src }) => (
    <div className="image-wrapper">
        <img className="responsive-img" src={src} alt={alt} />
    </div>
);

Image.propTypes = {
    alt: PropTypes.string,
    src: PropTypes.string.isRequired,
};

export default Image;
