// Queue (FIFO) with an exception - SuperBomb will skip to the front

class Bombs {
    constructor(explosionSize) {
        this.bombQueue = [];

        this.explosionSize = explosionSize;
    }

    pickUp(bomb) {
        (bomb instanceof Bomb) ? this.bombQueue.push(bomb) : this.bombQueue.unshift(bomb);
    }

    deploy() {
        const bomb = this.bombQueue.shift();
        if (bomb) bomb.deploy(this.explosionSize);
    }
}