import Grid from "./grid";
import Player from "./player";

class Game {
    constructor (canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.grid = new Grid(canvas, ctx);
        this.player = new Player(canvas, ctx);

        this.initialTime = Date.now();
        
        this.grid.drawGrid();
        this.grid.populateGrid();
        
        this.start();
    }

    

    start () {
        console.log('hello');
        if (this === undefined) debugger;
        let time = Date.now();
        let dt = (time - this.initialTime) / 1000.0;    

        this.update(dt);
        this.render();

        this.initialTime = time;
        requestAnimationFrame(this.start.bind(this));
    }

    update (dt) {
        // debugger;
        // console.log('hello');
        this.player.update(dt);
    }

    render () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.grid.drawGrid();
        this.grid.populateGrid();
        this.player.render();
    }

}

export default Game;