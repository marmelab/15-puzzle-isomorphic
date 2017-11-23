import React from 'react';
import Index from '../../pages/Index';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('should render Index correctly', () => {
    renderer.create(<Index />);
});
