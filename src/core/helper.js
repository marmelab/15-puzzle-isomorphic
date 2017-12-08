export const associateTileToBackground = grid => {
    const tileSize = grid.length > 0 ? 100 / grid.length : 0; // 100%

    let tileToBg = {};
    grid.forEach((row, rowKey) => {
        row.forEach((value, colKey) => {
            tileToBg[value] = `${tileSize * colKey}% ${tileSize * rowKey}%`;
        });
    });
    return tileToBg;
};

export const choiceInArray = (list, rand = Math.random()) => {
    if (!Array.isArray(list)) {
        throw Error('The list should be an array');
    }
    if (rand < 0 && rand >= 1) {
        throw Error(
            `The value ${rand} should be a number between 0 and 1, 1 excluded`,
        );
    }

    return list[Math.floor(rand * list.length)];
};
