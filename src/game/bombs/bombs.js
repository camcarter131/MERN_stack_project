const Bomb = require('./bomb');

class Bombs {
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
        if (bomb) {
            bomb.deploy();
            this.player.statsChange();
        }
    }
}

module.exports = Bombs;