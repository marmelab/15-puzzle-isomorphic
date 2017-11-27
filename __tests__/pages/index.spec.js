import React from 'react';
import renderer from 'react-test-renderer';

import Index from '../../pages/index';

describe('Index', () => {
    it('it should render Index without error', () => {
        renderer.create(<Index />);
    });

    it('should render the Index correctly', () => {
        const component = renderer.create(<Index />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
