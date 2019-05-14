// Queue (FIFO) with an exception - SuperBomb will skip to the front
const Bomb =require('./bomb');

class Bombs {
    constructor(player) {
        this.bombQueue = [new Bomb(player)];
    }

    //Comment in when we have a
    pickUp(bomb) {
        (bomb instanceof Bomb) ? this.bombQueue.push(bomb) : this.bombQueue.unshift(bomb);
    }
    
    deploy(explosionSize, playerPosition) {
        const bomb = this.bombQueue.shift();
        if (bomb) bomb.deploy(explosionSize, playerPosition);
    }
}

module.exports = Bombs;