export const associateTileToBackground = grid => {
    const tileSize = 100 / grid.length; // 100%
    let tileToBg = {};
    grid.forEach((row, rowKey) => {
        row.forEach((value, colKey) => {
            tileToBg[value] = `${tileSize * colKey}% ${tileSize * rowKey}%`;
        });
    });
    return tileToBg;
};
