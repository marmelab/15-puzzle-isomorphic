import React from 'react';
import renderer from 'react-test-renderer';

import FloatingButtonFab from './FloatingButtonFab';

describe('FloatingButtonFab', () => {
    test('should render FloatingButtonFab without error', () => {
        renderer.create(
            <FloatingButtonFab>
                <p>Child</p>
            </FloatingButtonFab>,
        );
    });

    test('should render the FloatingButtonFab correctly', () => {
        const component = renderer.create(
            <FloatingButtonFab>
                <p>Child</p>
            </FloatingButtonFab>,
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
