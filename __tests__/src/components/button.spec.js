import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Button from '../../../src/components/button';

describe('Button', () => {
    test('should render the Button without error', () => {
        renderer.create(<Button icon="" label="" route="" />);
    });

    test('should render the Button correctly', () => {
        const component = renderer.create(<Button icon="" label="" route="" />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('should contain a link', () => {
        const app = shallow(<Button icon="icon" label="label" route="path" />);
        expect(app.find('a').length).toEqual(1);
    });

    test('should render the icon', () => {
        const app = shallow(<Button icon="icon" label="label" route="path" />);
        expect(app.find('i').text()).toEqual('icon');
    });
});
