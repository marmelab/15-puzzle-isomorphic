import React from 'react';
import renderer from 'react-test-renderer';

import Section from './Section';

describe('Section', () => {
    test('should render Section without error', () => {
        renderer.create(<Section />);
    });

    test('should render the Section correctly', () => {
        const component = renderer.create(<Section />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
