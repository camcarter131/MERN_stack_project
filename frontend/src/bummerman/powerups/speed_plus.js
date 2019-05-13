import Powerup from './powerup';

export default class SpeedPlus extends Powerup {
    constructor () {
        super();

        this.name = 'Speed+';
        this.description = 'Increases the speed of player.';
        this.img = '';
    }

    onPickup(player) {
        super();
        player.speed += player.width;
    }
}