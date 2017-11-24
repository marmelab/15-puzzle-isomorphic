export default class Coords {
    constructor(y = 0, x = 0) {
        this.y = y;
        this.x = x;
    }

    equalsTo(coords) {
        if (!(coords instanceof Coords)) {
            throw 'The parameters should be a Coords';
        }
        return this.y === coords.y && this.x === coords.x;
    }
}
