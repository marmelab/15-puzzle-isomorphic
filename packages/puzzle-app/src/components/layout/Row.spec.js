import React from 'react';
import renderer from 'react-test-renderer';

import Row from './Row';

describe('Row', () => {
    test('should render Row without error', () => {
        renderer.create(
            <Row>
                <div>Child</div>
            </Row>,
        );
    });

    test('should render the Row correctly', () => {
        const component = renderer.create(
            <Row>
                <div>Child</div>
            </Row>,
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
