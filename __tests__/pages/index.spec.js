import React from 'react';
import renderer from 'react-test-renderer';

import Index from '../../pages/index';

describe('Index', () => {
    test('should render Index without error', () => {
        renderer.create(<Index />);
    });

    test('should render the Index correctly', () => {
        const component = renderer.create(<Index />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
