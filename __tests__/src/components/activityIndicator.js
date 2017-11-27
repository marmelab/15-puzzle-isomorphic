import React from 'react';
import renderer from 'react-test-renderer';

import ActivityIndicator from '../../../src/components/activityIndicator';

describe('ActivityIndicator', () => {
    test('should render ActivityIndicator without error', () => {
        renderer.create(<ActivityIndicator />);
    });

    test('should render the ActivityIndicator correctly', () => {
        const component = renderer.create(<ActivityIndicator />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
