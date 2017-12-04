import { title } from '../../pages/game';

describe('title', () => {
    test('should render a turn', () => {
        const expectedTitle = 'Turn 12';
        expect(title(false, false, 12)).toEqual(expectedTitle);
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
