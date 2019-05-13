import Bomb from './bomb';

class SuperBomb extends Bomb {
    constructor(ctx) {
        super();
    }

    explode() {
        clearInterval(this.flickerIntervalId);
        // for every cell in each direction until cell reaches an indestructible
        // object, renders an explosion that lasts 1500ms
    }
}