import React from 'react';
import renderer from 'react-test-renderer';

import MultiplayerGames from '../../pages/multiplayerGames';

// FIXME: this page is using a component dynamically loaded using the next/dynamic module. This bug will make the tests fail.
// You can find the related issue here : https://github.com/zeit/next.js/issues/3345
xdescribe('MultiplayerGames', () => {
    test('should render MultiplayerGames without error', () => {
        renderer.create(<MultiplayerGames />);
    });

    test('should render the MultiplayerGames correctly', () => {
        const component = renderer.create(<MultiplayerGames />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
