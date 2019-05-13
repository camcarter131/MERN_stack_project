import Grid from "./grid";
import Player from "./player";
import Sprite from "./animator/sprite";

class Game {
    constructor (canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.grid = new Grid(canvas, ctx);
        this.player = new Player(canvas, ctx);

        this.initialTime = Date.now();

        this.start();

        this.sprite = new Sprite(canvas, ctx, "assets/images/df_bomber_ss.png");
    }
    
    update (dt) {
        this.player.update(dt);
    }
    
    render () {
        // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.grid.drawGrid();
        this.grid.renderGame();
        
        this.player.render();

        // this.sprite.render();
    }

    start () {
        let time = Date.now();
        let dt = (time - this.initialTime) / 1000.0;    

        this.update(dt);
        this.render();

        this.initialTime = time;
        requestAnimationFrame(this.start.bind(this));
    }

}

export default Game;