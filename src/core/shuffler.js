import { deepCopyGrid, listCoordsMovableTiles, move } from './game';

export const SHUFFLE_DURATION = 1000;
export const SLEEP_DURATION = 1;

export const choiceCoords = coordsList =>
    coordsList[Math.floor(Math.random() * coordsList.length)];

const sleep = duration => {
    return new Promise(resolve => setTimeout(resolve, duration));
};

export const shuffle = async grid => {
    let shuffledGrid = deepCopyGrid(grid);

    const movePromise = new Promise(() => {
        let continueShuffling = true;
        while (continueShuffling) {
            const coords = listCoordsMovableTiles(shuffledGrid);
            shuffledGrid = move(shuffledGrid, choiceCoords(coords));

            async () => await sleep(SLEEP_DURATION)();
        }
    });
    await Promise.race(sleep(SHUFFLE_DURATION), movePromise);

    return shuffledGrid;
};
