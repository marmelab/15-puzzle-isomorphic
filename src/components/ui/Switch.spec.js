import React from 'react';
import renderer from 'react-test-renderer';

import Switch from './Switch';

describe('Switch', () => {
    test('should render Switch without error', () => {
        renderer.create(<Switch />);
    });

    test('should render the Switch correctly', () => {
        const component = renderer.create(<Switch />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
