import React from 'react';
import renderer from 'react-test-renderer';

import FloatingButton from './FloatingButton';

describe('FloatingButton', () => {
    test('should render FloatingButton without error', () => {
        renderer.create(
            <FloatingButton>
                <p>Child 1</p>
                <p>Child 2</p>
            </FloatingButton>,
        );
    });

    test('should render the FloatingButton correctly', () => {
        const component = renderer.create(
            <FloatingButton>
                <p>Child 1</p>
                <p>Child 2</p>
            </FloatingButton>,
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
