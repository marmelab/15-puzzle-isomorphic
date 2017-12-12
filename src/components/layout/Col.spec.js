import React from 'react';
import renderer from 'react-test-renderer';

import Col from './Col';

describe('Col', () => {
    test('should render Col without error', () => {
        renderer.create(<Col />);
    });

    test('should render the Col correctly', () => {
        const component = renderer.create(<Col />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
