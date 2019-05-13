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

    canvasToArray(canvasPosition) {
        return [canvasPosition[1] / 48, canvasPosition[0] / 48];
    }

    explode(explosionSize, position) {
        clearInterval(this.flickerIntervalId);

        // let left = [position.x - 1, position.y];
        // let right = [position.x + 1, position.y];
        // let up = [position.x, position.y - 1];
        // let down = [position.x, position.y + 1];

        // const directions = [left, right, up, down];

        // directions.forEach(dir => {

        // });
        position = canvasToArray(position);
        if (grid[position] !== 'X') return;

        const x = position.x;
        const y = position.y;

        for(var i = x - 1; i <= x + 1; i++) {
            if (i === x) continue;

            if (explosionSize > 0) {
                explode(explosionSize - 1, [i, y]);
            }
        }

        for(var j = y - 1; j <= y + 1; j++) {
            if (j === y) continue;

            if (explosionSize > 0) {
                explode(explosionSize - 1, [x, j]);
            }
        }

        const left = [x - 1, y];
        const right = [x + 1, y];
        const up = [x, y - 1];
        const down = [x, y + 1];

        const dir = [left, right, up, down];

        dir.forEach(d => {
            if (d !== 'X') return;

            explode(explosionSize - 1, d);
        });

        // this.position = {
        //     x: 7,
        //     y: 13
        // };


        // for every cell in each direction until count == explosionSize
        // render an explosion that lasts 1500 ms
    }

    render() {
        // do something with passed down ctx
    }
}