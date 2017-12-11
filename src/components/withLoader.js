import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ActivityIndicator from './ActivityIndicator';

export default WrappedComponent =>
    class LoaderHOC extends PureComponent {
        static propTypes = {
            isLoading: PropTypes.bool,
            size: PropTypes.string,
            ...WrappedComponent.propTypes,
        };

        static defaultProps = {
            isLoading: false,
            size: 'small',
            ...WrappedComponent.defaultProps,
        };

        render() {
            if (this.props.isLoading) {
                return <ActivityIndicator size={this.props.size} />;
            }
            return <WrappedComponent {...this.props} />;
        }
    };
