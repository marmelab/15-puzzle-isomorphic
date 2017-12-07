import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Block from '../../../src/components/Block';

describe('Bloc', () => {
    test('should render Bloc without error', () => {
        renderer.create(
            <Block>
                <div>Hello</div>
            </Block>,
        );
    });

    test('should render the Bloc correctly', () => {
        const component = renderer.create(
            <Block>
                <div>Hello</div>
            </Block>,
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('should render the title prop if passed', () => {
        const app = shallow(
            <Block title="title">
                <div>Hello</div>
            </Block>,
        );
        expect(app.find('h5').text()).toEqual('title');
    });

    test('should display a loader', () => {
        const app = shallow(
            <Block title="title" isLoading={true}>
                <div>Hello</div>
            </Block>,
        );

        expect(app.find('.activity-indicator-wrapper').length).toEqual(1);
    });
});
