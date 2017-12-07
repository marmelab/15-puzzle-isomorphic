import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ActivityIndicator from './ActivityIndicator';

export default function withLoader(WrappedComponent) {
    return class Loader extends PureComponent {
        static propTypes = {
            isLoading: PropTypes.bool.isRequired,
            size: PropTypes.string,
            ...WrappedComponent.propTypes,
        };

        static defaultProps = {
            isLoading: true,
            ...WrappedComponent.defaultProps,
        };

        render() {
            const { isLoading, size } = this.props;

            if (isLoading) {
                return <ActivityIndicator size={size} />;
            }
            return <WrappedComponent {...this.props} />;
        }
    };
}
