import Coords from '../../../src/core/coords';
import * as Shuffler from '../../../src/core/shuffler';

const mockMathRandom = val => {
    const mockMath = Object.create(global.Math);
    mockMath.random = () => val;
    global.Math = mockMath;
};

describe('Game', () => {
    describe('chooseCoords', () => {
        test('should choice random coords from a list', () => {
            mockMathRandom(0.25);

            const coordsList = [
                new Coords(1, 1),
                new Coords(1, 2),
                new Coords(2, 1),
                new Coords(2, 2),
            ];

            const expectedCoords = new Coords(1, 2);
            const coords = Shuffler.chooseCoords(coordsList);

            expect(expectedCoords.equalsTo(coords)).toBe(true);
        });
    });
});
