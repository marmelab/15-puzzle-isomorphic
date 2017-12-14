import React from 'react';
import renderer from 'react-test-renderer';

import SingleplayerGame, { title } from '../../pages/singleplayerGame';

// FIXME: this page is using a component dynamically loaded using the next/dynamic module. This bug will make the tests fail.
// You can find the related issue here : https://github.com/zeit/next.js/issues/3345
xdescribe('SingleplayerGame', () => {
    test('should render SingleplayerGame without error', () => {
        renderer.create(<SingleplayerGame />);
    });

    test('should render the Game correctly', () => {
        const component = renderer.create(<SingleplayerGame />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('title', () => {
    test('should render a turn', () => {
        const expectedTitle = '12 moves';
        expect(title(false, false, 12)).toEqual(expectedTitle);
    });

    test('should render the starting message', () => {
        const expectedTitle = 'Start the game by moving a tile';
        expect(title(false, false, 0)).toEqual(expectedTitle);
    });

    test('should render a victory', () => {
        const expectedTitle =
            'Congratulations, you have solved the puzzle in 12 turns!';
        expect(title(false, true, 12)).toEqual(expectedTitle);
    });

    test('should render a loading', () => {
        const expectedTitle = 'Building a new game';
        expect(title(true, false, 12)).toEqual(expectedTitle);
    });
});
