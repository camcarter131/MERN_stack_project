import Powerup from './powerup';

export default class SuperBombPlus extends Powerup {
    constructor () {
        super();

        this.name = 'SuperBomb+';
        this.description = 'Next bomb deployed by player will have explosive radius maximized to nearest indestructible cell in each direction.';
        this.img = '';
    }

    onPickup(player) {
        super();
        // player.bombs.unshift(new SuperBomb());
    }
}