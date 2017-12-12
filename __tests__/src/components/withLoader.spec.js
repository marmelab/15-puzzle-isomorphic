import React from 'react';
import { mount } from 'enzyme';

import withLoader from '../../../src/components/withLoader';

const Covfefe = () => <div>Despite the negative press covfefe</div>;
const CovfefeWithLoader = withLoader(Covfefe);

describe('withLoader', () => {
    test('should display a loader', () => {
        const comp = mount(<CovfefeWithLoader isLoading={true} />);
        expect(comp.find('.preloader-wrapper').length).toEqual(1);
    });

    test('should display a loader with a specific size', () => {
        const comp = mount(<CovfefeWithLoader isLoading={true} size="big" />);
        expect(comp.find('.big').length).toEqual(1);
    });

    test('should display the component', () => {
        const comp = mount(<CovfefeWithLoader isLoading={false} />);
        expect(comp.find('div').text()).toEqual(
            'Despite the negative press covfefe',
        );
    });
});
