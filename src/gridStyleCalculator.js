import { durationTranslate } from './config';
import { dirFromMove } from './core/game';

export const TILE_MARGIN = 2;
export const MAX_TILE_SIZE = 100;

export const DEFAULT_IMAGE_SIZE = 500;
export const IMAGE_SIZE = 100;

export const divideBackgroundStyle = (imageSize, nbOfTiles) =>
    imageSize / (nbOfTiles + 1);

export const buildBackgroundStyle = (
    nbTiles,
    tileImageUrl,
    tileImageCoords,
    tileSize,
    unit = 'px',
) => ({
    backgroundImage: `url(${tileImageUrl})`,
    backgroundPosition: tileImageCoords,
    backgroundSize: `${(nbTiles + 1) * tileSize}${unit}`,
});

export const buildDimensionStyle = (tileSize = MAX_TILE_SIZE, unit) => ({
    height: `calc(${tileSize}${unit})`,
    margin: `${TILE_MARGIN}px`,
    width: `calc(${tileSize}${unit})`,
});

export const buildTranslateStyle = (dir, tileSize, tileValue, unit) => {
    const translatingDir = {
        y: `${dir.y} * (${tileSize}${unit} + ${TILE_MARGIN}px)`,
        x: `${dir.x} * (${tileSize}${unit} + ${TILE_MARGIN}px)`,
    };
    return {
        transition: `transform ${durationTranslate}ms ease-out`,
        transform: `translate(calc(${translatingDir.x}), calc(${
            translatingDir.y
        }))`,
    };
};

export const buildResponsiveDimension = (isResponsive, nbTiles) => {
    let tileSize, dimensionStyle;
    if (isResponsive) {
        tileSize = divideBackgroundStyle(IMAGE_SIZE, nbTiles);
        dimensionStyle = buildDimensionStyle(tileSize, 'vw');
    } else {
        tileSize = divideBackgroundStyle(DEFAULT_IMAGE_SIZE, nbTiles);
        dimensionStyle = buildDimensionStyle(tileSize, 'px');
    }
    return { dimensionStyle, tileSize };
};

export const buildResponsiveTranslate = (
    isResponsive,
    grid,
    tileSize,
    tileValue,
) => {
    const dir = dirFromMove(grid, tileValue);
    return isResponsive
        ? buildTranslateStyle(dir, tileSize, tileValue, 'vw')
        : buildTranslateStyle(dir, tileSize, tileValue, 'px');
};

export const buildResponsiveBackground = (
    isResponsive,
    nbTiles,
    tileImageUrl,
    tileImageCoords,
    tileSize,
) =>
    buildBackgroundStyle(
        nbTiles,
        tileImageUrl,
        tileImageCoords,
        tileSize,
        isResponsive ? 'vw' : 'px',
    );
