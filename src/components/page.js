import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import CustomHead from './customHead';
import Nav from './nav';

export default class Page extends PureComponent {
    static propTypes = {
        children: PropTypes.element.isRequired,
    };

    componentDidMount() {
        if (!('serviceWorker' in navigator)) {
            console.warn('Service worker not supported');
            return;
        }
        navigator.serviceWorker
            .register('/sw.js')
            .catch(err =>
                console.warn(
                    'Cache service worker registration failed',
                    err.message,
                ),
            );
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
