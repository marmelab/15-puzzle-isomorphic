import React from 'react';
import renderer from 'react-test-renderer';

import CustomHead from './CustomHead';

describe('CustomHead', () => {
    test('should render CustomHead without error', () => {
        renderer.create(<CustomHead />);
    });

    test('should render the CustomHead correctly', () => {
        const component = renderer.create(<CustomHead />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
