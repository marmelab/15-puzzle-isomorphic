import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { defaultImageUrl, imageUrls } from '../../config';

import { initGameImage } from '../../core/main';

export default WrappedComponent =>
    class BackgroundHOC extends Component {
        static propTypes = {
            resolvedGrid: PropTypes.array.isRequired,
            ...WrappedComponent.propTypes,
        };

        static defaultProps = {
            ...WrappedComponent.defaultProps,
        };

        state = {
            imageCoords: null,
            imageUrl: null,
        };

        componentWillMount() {
            const { imageCoords, imageUrl } = initGameImage(
                imageUrls.length > 0 ? imageUrls : [defaultImageUrl],
                this.props.resolvedGrid,
            );

            this.setState({
                imageCoords,
                imageUrl,
            });
        }

        render() {
            const { imageCoords, imageUrl } = this.state;

            return (
                <WrappedComponent
                    imageUrl={imageUrl}
                    imageCoords={imageCoords}
                    {...this.props}
                />
            );
        }
    };
