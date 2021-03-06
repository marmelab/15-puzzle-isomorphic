import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Button from './Button';

describe('Button', () => {
    test('should render the Button without error', () => {
        renderer.create(
            <Button icon="" label="" route="" onClick={() => {}} />,
        );
    });

    test('should render the Button correctly', () => {
        const component = renderer.create(
            <Button icon="" label="" route="" onClick={() => {}} />,
        );
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

    test('should contain a link even if there is not route', () => {
        const app = shallow(
            <Button icon="icon" label="label" onClick={() => {}} />,
        );
        expect(app.find('a').length).toEqual(1);
    });

    test('should render the icon even if there is not route', () => {
        const app = shallow(
            <Button icon="icon" label="label" onClick={() => {}} />,
        );
        expect(app.find('i').text()).toEqual('icon');
    });

    test('should set a title', () => {
        const app = shallow(<Button icon="icon" label="label" route="path" />);
        expect(app.find('a').prop('title')).toEqual('label');
    });
});
