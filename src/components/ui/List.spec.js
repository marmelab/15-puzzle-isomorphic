import React from 'react';
import renderer from 'react-test-renderer';

import List from './List';

describe('List', () => {
    test('should render List without error', () => {
        renderer.create(
            <List items={[]} onClickItem={() => {}}>
                <div>Children</div>
            </List>,
        );
    });

    test('should render the List correctly without a title', () => {
        const component = renderer.create(
            <List items={[]} onClickItem={() => {}}>
                <div>Children</div>
            </List>,
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('should render the List correctly with a title and items', () => {
        const items = [{ value: 1 }, { value: 2 }, { value: 3 }];
        const component = renderer.create(
            <List items={items} title="Title" onClickItem={() => {}}>
                <div>Children</div>
            </List>,
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
