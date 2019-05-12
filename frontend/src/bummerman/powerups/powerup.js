export default class Powerup {
    constructor(canvas, ctx) {
        this.size = {
            width: canvas.width / 15,
            height: canvas.height / 15
        };

        this.name = 'ERROR';
        this.description = 'ERROR';
        this.img = '';
    }

    onPickup() {
        console.log(`${this.name} received!`);
    }
}