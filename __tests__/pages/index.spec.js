import React from 'react';
import Index from '../../pages/Index';
import { shallow } from 'enzyme';

import renderer from 'react-test-renderer';

describe('Index', () => {
    it('should render Index correctly', () => {
        renderer.create(<Index />);
    });

    it('should contain the main title', () => {
        const app = shallow(<Index />);
        expect(app.find('h1').text()).toEqual('Welcome to the 15 puzzle game!');
    });

    it('should match with snapshot', () => {
        const component = renderer.create(<Index />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
