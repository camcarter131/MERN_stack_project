import Powerup from './powerup';

export default class BombPlus extends Powerup {
    constructor () {
        super();

        this.name = 'Bomb+';
        this.description = 'Increases the maximum number of bombs player can carry by 1.';
        this.img = '';
    }

    onPickup(player) {
        super();
        // player.maxBombs += 1;
    }
}