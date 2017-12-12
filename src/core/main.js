import {
    areGridsEquals,
    buildGrid,
    findTileByValue,
    move,
    DEFAULT_SIZE,
} from './game';
import { shuffle } from './shuffler';
import { associateTileToBackground, choiceInArray } from './helper';

export const initGame = async (size = DEFAULT_SIZE) => {
    let resolvedGrid = buildGrid(size);
    let currentGrid = await shuffle(resolvedGrid);

    return {
        currentGrid,
        isVictory: false,
        resolvedGrid,
        turn: 0,
    };
};

export const moveTile = ({ currentGrid, resolvedGrid, turn }, tile) => {
    const coordsTileToMove = findTileByValue(currentGrid, tile);
    const newCurrentGrid = move(currentGrid, coordsTileToMove);
    const isVictory = areGridsEquals(newCurrentGrid, resolvedGrid);

    return {
        currentGrid: newCurrentGrid,
        resolvedGrid,
        isVictory,
        turn: turn + 1,
    };
};

export const initGameImage = (imagesUrl, grid) => {
    const imageCoords = associateTileToBackground(grid);
    const imageUrl = choiceInArray(imagesUrl);

    return {
        imageCoords,
        imageUrl,
    };
};
