import React from 'react';
import renderer from 'react-test-renderer';

import MultiplayerGame, { title } from '../../pages/multiplayerGame';

// FIXME: this page is using a component dynamically loaded using the next/dynamic module. This bug will make the tests fail.
// You can find the related issue here : https://github.com/zeit/next.js/issues/3345
xdescribe('MultiplayerGames', () => {
    test('should render MultiplayerGame without error', () => {
        renderer.create(<MultiplayerGame />);
    });

    test('should render the MultiplayerGame correctly', () => {
        const component = renderer.create(<MultiplayerGame />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('title', () => {
    test('should render a turn', () => {
        const expectedTitle = '12 moves';
        expect(title(1, false, false, false, false, 12)).toEqual(expectedTitle);
    });

    test('should render the starting message', () => {
        const expectedTitle = 'Start the game by moving a tile';
        expect(title(1, false, false, false, false, 0)).toEqual(expectedTitle);
    });

    test('should render a victory', () => {
        const expectedTitle =
            'Congratulations, you have solved the puzzle in 12 turns!';
        expect(title(1, false, true, false, true, 12)).toEqual(expectedTitle);
    });

    test('should render a victory from the opponent', () => {
        const expectedTitle =
            'Sorry, you opponent solved the puzzle in 12 turns!';
        expect(title(1, false, false, false, true, 12)).toEqual(expectedTitle);
    });

    test('should render a waiting for a player message', () => {
        const expectedTitle = 'Waiting for another player in game #1';
        expect(title(1, false, false, true, false, 0)).toEqual(expectedTitle);
    });

    test('should render a loading', () => {
        const expectedTitle = 'Loading the game #1';
        expect(title(1, true, false, false, false, 0)).toEqual(expectedTitle);
    });
});
