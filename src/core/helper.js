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
