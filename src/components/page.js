import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import CustomHead from './customHead';
import { ShowWhenOnline, ShowWhenOffline } from './detectOffline';
import Nav from './nav';

import config from '../config';

export default class Page extends PureComponent {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element),
        ]).isRequired,
        navTitle: PropTypes.string,
        title: PropTypes.string,
    };

    static defaultProps = {
        navTitle: '15 Puzzle',
        title: '15 Puzzle',
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
        const { children, navTitle, title } = this.props;

        return (
            <div>
                <CustomHead title={title} />
                <ShowWhenOnline>
                    <Nav title={navTitle} />
                </ShowWhenOnline>
                <ShowWhenOffline>
                    <Nav title={title} colors={['grey', 'lighten-1']} />
                </ShowWhenOffline>
                <section className="container">{children}</section>
                <script
                    type="text/javascript"
                    src="https://code.jquery.com/jquery-3.2.1.min.js"
                />
                <script
                    type="text/javascript"
                    src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"
                />
            </div>
        );
    }
}
