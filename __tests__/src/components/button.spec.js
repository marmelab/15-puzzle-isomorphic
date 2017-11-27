import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Button from '../../../src/components/button';

describe('Button', () => {
    it('it should render the Button without error', () => {
        renderer.create(<Button icon="" label="" path="" />);
    });

    it('should render the Button correctly', () => {
        const component = renderer.create(<Button icon="" label="" path="" />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should contain a link', () => {
        const app = shallow(<Button icon="icon" label="label" path="path" />);
        expect(app.find('a').length).toEqual(1);
    });

    it('should render the icon', () => {
        const app = shallow(<Button icon="icon" label="label" path="path" />);
        expect(app.find('i').text()).toEqual('icon');
    });
});
