import Coords from '../../../src/core/coords';

describe('Game', () => {
    describe('Coords', () => {
        test('should construct coords wtesth default value', () => {
            const coords = new Coords();

            expect(coords.y).toEqual(0);
            expect(coords.x).toEqual(0);
        });

        test('should return true if two coords are equals', () => {
            const coords = new Coords(1, 3);
            const coords2 = new Coords(1, 3);

            expect(coords.equalsTo(coords2)).toBe(true);
            expect(coords2.equalsTo(coords)).toBe(true);
        });

        test('should return false if two coords are not equals', () => {
            const coords = new Coords(1, 3);
            const coords2 = new Coords(4, 4);

            expect(coords.equalsTo(coords2)).toBe(false);
            expect(coords2.equalsTo(coords)).toBe(false);
        });

        test('should throw an error if the parameters is not a Coords', () => {
            const coords = new Coords(1, 3);
            const coords2 = { x: 1, y: 3 };

            expect(() => {
                coords.equalsTo(coords2);
            }).toThrow();
        });
    });
});
