import { title } from '../../pages/multiplayerGame';

describe('title', () => {
    test('should render a turn', () => {
        const expectedTitle = 'Turn 12';
        expect(title(1, false, false, false, false, 12)).toEqual(expectedTitle);
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
