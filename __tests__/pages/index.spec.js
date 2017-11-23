import React from 'react';
import Index from '../../pages/index';
import { shallow } from 'enzyme';

import renderer from 'react-test-renderer';

describe('Index', () => {
    it('it should render Index without error', () => {
        renderer.create(<Index />);
    });

    it('should contain the main title', () => {
        const app = shallow(<Index />);
        expect(app.find('h1').text()).toEqual('Welcome to the 15 puzzle game!');
    });

    it('should render the Index correctly', () => {
        const component = renderer.create(<Index />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
