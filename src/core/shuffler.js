import { deepCopyGrid, listCoordsMovableTiles, move } from './game';

export const SHUFFLE_DURATION = 1000;
export const SLEEP_DURATION = 1;

export const chooseCoords = coordsList =>
    coordsList[Math.floor(Math.random() * coordsList.length)];

const sleep = duration => {
    return new Promise(resolve => setTimeout(resolve, duration));
};

export const shuffle = async (grid, shuffleDuration = SHUFFLE_DURATION) => {
    let shuffledGrid = deepCopyGrid(grid);

    const startShuffling = new Promise(() => {
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const coords = listCoordsMovableTiles(shuffledGrid);
            shuffledGrid = move(shuffledGrid, chooseCoords(coords));

            async () => await sleep(SLEEP_DURATION)();
        }
    });
    await Promise.race(sleep(shuffleDuration), startShuffling);

    return shuffledGrid;
};
