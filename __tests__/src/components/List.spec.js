import React from 'react';
import renderer from 'react-test-renderer';

import List from '../../../src/components/List';

describe('List', () => {
    test('should render List without error', () => {
        renderer.create(
            <List items={[]}>
                <div>Children</div>
            </List>,
        );
    });

    test('should render the List correctly without a title', () => {
        const component = renderer.create(
            <List items={[]}>
                <div>Children</div>
            </List>,
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('should render the List correctly with a title and items', () => {
        const component = renderer.create(
            <List items={[1, 2, 3]} title="Title">
                <div>Children</div>
            </List>,
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
