import * as Shuffler from '../../../src/core/shuffler';

describe('Game', () => {
    describe('chooseCoords', () => {
        test('should choice random coords from a list', () => {
            jest.spyOn(global.Math, 'random').mockImplementation(() => 0.25);

            const coordsList = [
                { y: 1, x: 1 },
                { y: 1, x: 2 },
                { y: 2, x: 1 },
                { y: 2, x: 2 },
            ];

            const expectedCoords = { y: 1, x: 2 };
            const coords = Shuffler.chooseCoords(coordsList);

            expect(coords).toEqual(expectedCoords);
        });
    });
});
