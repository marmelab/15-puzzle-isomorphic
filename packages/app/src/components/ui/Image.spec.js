import React from 'react';
import renderer from 'react-test-renderer';

import Image from './Image';

describe('Image', () => {
    test('should render Image without error', () => {
        renderer.create(<Image src="path/to/image" />);
    });

    test('should render the Image correctly', () => {
        const component = renderer.create(<Image src="path/to/image" />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
