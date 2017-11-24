export const EMPTY_VALUE = 0;

export const buildGrid = (size = 4) => {
    let value = EMPTY_VALUE;
    let grid = [];

    for (let y = 0; y < size; y++) {
        grid[y] = [];

        for (let x = 0; x < size; x++) {
            value++;
            grid[y][x] = value === size * size ? EMPTY_VALUE : value;
        }
    }
    return grid;
};

export const deepCopyGrid = grid => grid.map(row => [...row]);

export const areGridsEquals = (grid1, grid2) => {
    if (!grid1 || !grid2) {
        return false;
    }

    if (grid1.length != grid2.length) {
        return false;
    }

    for (let i = 0; i < grid1.length; i++) {
        if (!(grid1[i] instanceof Array) && !(grid2[i] instanceof Array)) {
            return grid1[i] === grid2[i];
        } else if (!areGridsEquals(grid1[i], grid2[i])) {
            return false;
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
    let coordsEmptyTile = findEmptyTile(grid);

    const { y, x } = coordsEmptyTile;

    let coordsMovableTiles = [];
    if (y > 0) {
        coordsMovableTiles.push({ y: y - 1, x });
    }
    if (x + 1 < grid.length) {
        coordsMovableTiles.push({ y, x: x + 1 });
    }
    if (y + 1 < grid.length) {
        coordsMovableTiles.push({ y: y + 1, x });
    }
    if (x > 0) {
        coordsMovableTiles.push({ y, x: x - 1 });
    }
    return coordsMovableTiles;
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
