import React from 'react';
import renderer from 'react-test-renderer';

import Index from '../../pages/index';

// FIXME: this page is using a component dynamically loaded using the next/dynamic module. This bug will make the tests fail.
// You can find the related issue here : https://github.com/zeit/next.js/issues/3345
xdescribe('Index', () => {
    test('should render Index without error', () => {
        renderer.create(<Index />);
    });

    test('should render the Index correctly', () => {
        const component = renderer.create(<Index />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
