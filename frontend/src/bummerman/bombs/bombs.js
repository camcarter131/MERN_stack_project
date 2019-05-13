// Queue (FIFO) with an exception - SuperBomb will skip to the front

export default class Bombs {
    constructor() {
        this.bombQueue = [];
    }

    pickUp(bomb) {
        (bomb instanceof Bomb) ? this.bombQueue.push(bomb) : this.bombQueue.unshift(bomb);
    }

    deploy(explosionSize, playerPosition) {
        const bomb = this.bombQueue.shift();
        if (bomb) bomb.deploy(explosionSize, playerPosition);
    }
}