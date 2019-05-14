// Queue (FIFO) with an exception - SuperBomb will skip to the front
import Bomb from './bomb';

export default class Bombs {
    constructor(player) {
        this.bombQueue = [new Bomb(player)];
        this.player = player;
    }

    //Comment in when we have a
    pickUpBomb() {
        let newBomb = new Bomb(this.player);
        this.bombQueue.push(newBomb);
    }
    
    deploy() {
        let bomb = this.bombQueue.pop();
        if (bomb) bomb.deploy();
    }
}