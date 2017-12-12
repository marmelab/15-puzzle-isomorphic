export const EMPTY_VALUE = 0;
export const DEFAULT_SIZE = 4;

export const buildGrid = (size = DEFAULT_SIZE) => {
    return Array(size)
        .fill(1)
        .map((val, y) =>
            Array(size)
                .fill(1)
                .map((val, x) => {
                    const value = y * size + x + 1;
                    return value === size * size ? EMPTY_VALUE : value;
                }),
        );
};

export const deepCopyGrid = grid => grid.map(row => [...row]);

export const areGridsEquals = (grid1, grid2) => {
    if (!grid1 || !grid2) {
        return false;
    }

    if (grid1.length != grid2.length) {
        return false;
    }

    const sizeY = grid1.length;
    for (let y = 0; y < sizeY; y++) {
        if (grid1[y].length !== grid2[y].length) {
            return false;
        }
        const sizeX = grid1[y].length;
        for (let x = 0; x < sizeX; x++) {
            if (grid1[y][x] !== grid2[y][x]) {
                return false;
            }
        }
    }
    return true;
};

export const areCoordsEquals = (coords1, coords2) => {
    return (
        coords1 && coords2 && coords1.y === coords2.y && coords1.x === coords2.x
    );
};

export const findTileByValue = (grid, valueToSearch) => {
    for (let y = 0; y < grid.length; y++) {
        let x = grid[y].findIndex(value => value === valueToSearch);
        if (x !== -1) {
            return { y, x };
        }
    }
    throw `The tile with value ${valueToSearch} doesn't exist.`;
};

export const findEmptyTile = grid => findTileByValue(grid, EMPTY_VALUE);

export const listCoordsMovableTiles = grid => {
    const { y, x } = findEmptyTile(grid);

    return [
        y > 0 && { y: y - 1, x },
        x + 1 < grid.length && { y, x: x + 1 },
        y + 1 < grid.length && { y: y + 1, x },
        x > 0 && { y, x: x - 1 },
    ].filter(x => x);
};

export const isTileInMovableTiles = (grid, coordsTileToMove) =>
    listCoordsMovableTiles(grid).some(coords =>
        areCoordsEquals(coords, coordsTileToMove),
    );

export const move = (grid, coordsTileToMove) => {
    if (!isTileInMovableTiles(grid, coordsTileToMove)) {
        throw `The tile at coords (${coordsTileToMove.y}, ${
            coordsTileToMove.x
        }) is not movable.`;
    }

    let emptyTileCoords = findEmptyTile(grid);
    let newCoords = findTileByValue(
        grid,
        grid[coordsTileToMove.y][coordsTileToMove.x],
    );

    let newGrid = deepCopyGrid(grid);
    newGrid[emptyTileCoords.y][emptyTileCoords.x] =
        grid[newCoords.y][newCoords.x];
    newGrid[newCoords.y][newCoords.x] =
        grid[emptyTileCoords.y][emptyTileCoords.x];
    return newGrid;
};
