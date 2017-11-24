import Coords from './coords';

export const EMPTY_VALUE = 0;

export const buildGrid = (size = 4) => {
    let value = EMPTY_VALUE;
    let grid = [];

    for (let y = 0; y < size; y++) {
        grid[y] = [];

        for (let x = 0; x < size; x++) {
            value++;
            grid[y][x] =
                value == size * size ? EMPTY_VALUE : (grid[y][x] = value);
        }
    }
    return grid;
};

export const deepCopyGrid = grid => grid.map(row => row.slice());

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

export const findTileByValue = (grid, valueToSearch) => {
    for (let y = 0; y < grid.length; y++) {
        let x = grid[y].findIndex(value => value === valueToSearch);
        if (x !== -1) {
            return new Coords(y, x);
        }
    }
    throw `The tile with value ${valueToSearch} doesn't exist.`;
};

export const findEmptyTile = grid => findTileByValue(grid, EMPTY_VALUE);

export const listCoordsMovableTiles = grid => {
    let coordsEmptyTile = findEmptyTile(grid);

    const Y = coordsEmptyTile.y;
    const X = coordsEmptyTile.x;

    let coordsMovableTiles = [];
    if (Y > 0) {
        coordsMovableTiles.push(new Coords(Y - 1, X));
    }
    if (X + 1 < grid.length) {
        coordsMovableTiles.push(new Coords(Y, X + 1));
    }
    if (Y + 1 < grid.length) {
        coordsMovableTiles.push(new Coords(Y + 1, X));
    }
    if (X > 0) {
        coordsMovableTiles.push(new Coords(Y, X - 1));
    }
    return coordsMovableTiles;
};

export const isTileInMovableTiles = (grid, coordsTileToMove) =>
    listCoordsMovableTiles(grid).some(coords =>
        coords.equalsTo(coordsTileToMove),
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
