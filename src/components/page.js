import React from 'react';
import PropTypes from 'prop-types';

import CustomHead from './customHead';
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

export default Page;
