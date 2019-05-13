export default class Bomb {
    constructor(ctx) {
        this.img = '';
        this.flickerIntervalId = null;

        this.explode = this.explode.bind(this);
        this.flicker = this.flicker.bind(this);
    }

    deploy() {
        setTimeout(this.explode, 3000);
        setTimeout(this.flicker, 2000);
        this.render();
    }

    flicker() {
        this.flickerIntervalId = setInterval(() => { }, 100);
    }

    explode(explosionSize) {
        clearInterval(this.flickerIntervalId);
        // for every cell in each direction until count == explosionSize
        // render an explosion that lasts 1500 ms
    }

    render() {
        // do something with passed down ctx
    }
}