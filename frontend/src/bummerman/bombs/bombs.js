// Queue (FIFO) with an exception - SuperBomb will skip to the front
import Bomb from './bomb';

export default class Bombs {
    constructor(player) {
        this.player = player;
        this.bombQueue = [new Bomb(player)];
        this.deploy = this.deploy.bind(this);
    }

    //Comment in when we actually have a bomb powerup.
    pickUp(bomb) {
        (bomb instanceof Bomb) ? this.bombQueue.push(bomb) : this.bombQueue.unshift(bomb);
    }
    
    deploy() {
        const bomb = this.bombQueue.shift();
        if (bomb) bomb.deploy();
    }
}