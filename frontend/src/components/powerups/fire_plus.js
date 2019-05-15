import Powerup from './powerup';

export default class FirePlus extends Powerup {
    constructor () {
        super();

        this.name = 'Fire+';
        this.description = 'Increases explosive radius of bombs played by player by one unit.';
        this.img = '';
    }

    onPickup(player) {
        super();
        // player.explosionSize += 1;
    }
}