import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import CustomHead from './customHead';
import Nav from './nav';

import config from '../config';

export default class Page extends PureComponent {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element),
        ]).isRequired,
    };

    componentDidMount() {
        if (!config.useCache) {
            console.warn('The client cache is disabled');
            return;
        }
        if (!('serviceWorker' in navigator)) {
            console.warn('Service worker not supported');
            return;
        }
        navigator.serviceWorker.register('/service-worker.js').catch(err => {
            console.warn(
                'Preload service worker registration failed',
                err.message,
            );
        });
    }

    render() {
        const { children } = this.props;

        return (
            <div>
                <CustomHead />
                <Nav />
                <section className="container">{children}</section>
            </div>
        );
    }
}
