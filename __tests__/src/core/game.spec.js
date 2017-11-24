import * as Game from '../../../src/core/game';

describe('Game', () => {
    describe('buildGrid', () => {
        test('should build a grid of size 3', () => {
            const grid = Game.buildGrid(3);
            const expectedGrid = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];

            expect(grid).toEqual(expectedGrid);
        });

        test('should build a grid of size 4 by default', () => {
            const expectedGrid = [
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [13, 14, 15, 0],
            ];

            const grid = Game.buildGrid();

            expect(grid.length).toEqual(4);
            expect(grid).toEqual(expectedGrid);
        });
    });

    describe('deepCopyGrid', () => {
        test('should copy a grid', () => {
            const grid = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];
            const expectedGrid = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];

            const gridCopied = Game.deepCopyGrid(grid);

            grid[0][0] = 18;

            expect(gridCopied[0][0]).toEqual(1);

            expect(gridCopied.length).toEqual(expectedGrid.length);
            expect(gridCopied).toEqual(expectedGrid);
        });
    });

    describe('areGridsEquals', () => {
        test('should return true if two grids are deep equals', () => {
            const grid = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];
            const expectedGrid = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];

            const areEquals = Game.areGridsEquals(grid, expectedGrid);
            expect(areEquals).toBe(true);
        });

        test('should return false if two grids are not deep equals', () => {
            const grid = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];
            const expectedGrid = [[3, 12, 1], [5, 3, 6], [7, 8, 36]];

            const areEquals = Game.areGridsEquals(grid, expectedGrid);
            expect(areEquals).toBe(false);
        });

        test('should return false if the two grids do not have the same length', () => {
            const grid = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];
            const expectedGrid = [[3, 12], [5, 3], [7, 8]];

            const areEquals = Game.areGridsEquals(grid, expectedGrid);
            expect(areEquals).toBe(false);
        });
    });

    describe('areCoordsEquals', () => {
        test('should return true if two coords are equals', () => {
            const coords1 = { y: 3, x: 4 };
            const coords2 = { y: 3, x: 4 };

            const areEquals = Game.areCoordsEquals(coords1, coords2);
            expect(areEquals).toBe(true);
        });

        test('should return false if two coords are not equals', () => {
            const coords1 = { y: 3, x: 4 };
            const coords2 = { y: 4, x: 6 };

            const areEquals = Game.areCoordsEquals(coords1, coords2);
            expect(areEquals).toBe(false);
        });
    });

    describe('findTileByValue', () => {
        test('should find a tile that is in the grid', () => {
            const grid = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];
            const value = 5;
            const expectedCoords = { y: 1, x: 1 };

            const coords = Game.findTileByValue(grid, value);

            expect(coords.y).toEqual(expectedCoords.y);
            expect(coords.x).toEqual(expectedCoords.x);
            expect(grid[coords.y][coords.x]).toEqual(value);
        });

        test('should throw an error if the tile is not in the grid', () => {
            const grid = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];

            expect(() => {
                Game.findTileByValue(grid, 18);
            }).toThrow(`The tile with value 18 doesn't exist.`);
        });
    });

    describe('findEmptyTile', () => {
        test('should find the empty tile', () => {
            const grid = [[1, 2, 3], [4, 0, 5], [7, 8, 6]];
            const expectedCoords = { y: 1, x: 1 };
            const coords = Game.findEmptyTile(grid);

            expect(coords.y).toEqual(expectedCoords.y);
            expect(coords.x).toEqual(expectedCoords.x);
            expect(grid[coords.y][coords.x]).toEqual(Game.EMPTY_VALUE);
        });

        test('should throw an error if there is not empty tile', () => {
            const grid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

            expect(() => {
                Game.findEmptyTile(grid);
            }).toThrow();
        });
    });

    describe('listCoordsMovableTiles', () => {
        test('should throw an error if there is not empty tile', () => {
            const grid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

            expect(() => {
                Game.listCoordsMovableTiles(grid);
            }).toThrow();
        });

        test('should return the movable tiles', () => {
            const grid = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];
            const expectedMovableTile1 = { y: 1, x: 2 };
            const expectedMovableTile2 = { y: 2, x: 1 };

            const movableTiles = Game.listCoordsMovableTiles(grid);

            expect(movableTiles.length).toEqual(2);

            expect(movableTiles[0].y).toEqual(expectedMovableTile1.y);
            expect(movableTiles[0].x).toEqual(expectedMovableTile1.x);

            expect(movableTiles[1].y).toEqual(expectedMovableTile2.y);
            expect(movableTiles[1].x).toEqual(expectedMovableTile2.x);
        });

        test('should throw an error if there is not empty tile', () => {
            const grid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

            expect(() => {
                Game.listCoordsMovableTiles(grid);
            }).toThrow();
        });
    });

    describe('isTileInMovableTiles', () => {
        test('should return true if a tile is in movable tiles', () => {
            const grid = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];
            const coords = { y: 1, x: 2 };
            const isInMovableTiles = Game.isTileInMovableTiles(grid, coords);

            expect(isInMovableTiles).toBe(true);
        });

        test('should return false if a tile is in not movable tiles', () => {
            const grid = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];
            const coords = { y: 1, x: 0 };
            const isInMovableTiles = Game.isTileInMovableTiles(grid, coords);

            expect(isInMovableTiles).toBe(false);
        });
    });

    describe('move', () => {
        test('should return the new grid after a move', () => {
            const grid = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];
            const expectedGrid = [[1, 2, 3], [4, 5, 0], [7, 8, 6]];

            const tileToMove = { y: 1, x: 2 }; // Move 6
            const newGrid = Game.move(grid, tileToMove);

            expect(newGrid).toEqual(expectedGrid);
        });

        test('should not change the original grid', () => {
            const grid = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];
            const expectedGrid = [[1, 2, 3], [4, 5, 6], [7, 8, 6]];

            const tileToMove = { y: 1, x: 2 };
            Game.move(grid, tileToMove);

            expect(grid).not.toEqual(expectedGrid);
        });

        test('should throw an error if the move is not possible', () => {
            const grid = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];
            const tileToMove = { y: 0, x: 0 };

            expect(() => {
                Game.move(grid, tileToMove);
            }).toThrow(`The tile at coords (0, 0) is not movable.`);
        });
    });
});