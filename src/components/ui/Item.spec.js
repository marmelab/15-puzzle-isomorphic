import React from 'react';
import renderer from 'react-test-renderer';

import Item from './Item';

describe('Item', () => {
    test('should render an Item without error', () => {
        renderer.create(<Item />);
    });

    test('should render an Item correctly', () => {
        const component = renderer.create(<Item />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
