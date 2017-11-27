import React from 'react';
import PropTypes from 'prop-types';

import CustomHead from './head';
import Nav from './nav';

const Page = ({ children }) => (
    <div>
        <CustomHead />
        <Nav />
        <section className="container">{children}</section>
    </div>
);

Page.propTypes = {
    children: PropTypes.element.isRequired,
};

Page.componentDidMount = () => {
    if (!('serviceWorker' in navigator)) {
        console.warn('Service worker not supported');
        return;
    }
    navigator.serviceWorker
        .register('/sw.js')
        .catch(err => console.error('Service worker registration failed', err));
};

export default Page;
