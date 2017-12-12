import React from 'react';
import renderer from 'react-test-renderer';

import Page from './Page';

// FIXME: this page is using a component dynamically loaded using the next/dynamic module. This bug will make the tests fail.
// You can find the related issue here : https://github.com/zeit/next.js/issues/3345
xdescribe('Page', () => {
    test('should render Page without error', () => {
        renderer.create(<Page />);
    });

    test('should render the Page correctly', () => {
        const component = renderer.create(<Page />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
