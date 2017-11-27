import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Bloc from '../../../src/components/bloc';

describe('Bloc', () => {
    test('should render Bloc without error', () => {
        renderer.create(
            <Bloc>
                <div>Hello</div>
            </Bloc>,
        );
    });

    test('should render the Bloc correctly', () => {
        const component = renderer.create(
            <Bloc>
                <div>Hello</div>
            </Bloc>,
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('should render the title prop if passed', () => {
        const app = shallow(
            <Bloc title="title">
                <div>Hello</div>
            </Bloc>,
        );
        expect(app.find('h5').text()).toEqual('title');
    });

    test('should display a loader', () => {
        const app = shallow(
            <Bloc title="title" isLoading={true}>
                <div>Hello</div>
            </Bloc>,
        );

        expect(app.find('.activity-indicator-wrapper').length).toEqual(1);
    });
});
