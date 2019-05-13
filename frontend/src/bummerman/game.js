import Grid from "./grid";
import Player from "./player/player";
import ResourceManager from "./resource_manager/resource_manager";

class Game {
    constructor (canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.rm = new ResourceManager();

        this.grid = new Grid(canvas, ctx);
<<<<<<< HEAD
        this.player = new Player(canvas, ctx, this.grid);
=======
        // this.player = new Player(canvas, ctx);
>>>>>>> b828e6502334d0695cbb265669ebdf0040337b5d

        this.initialTime = Date.now();

        
        this.rm.load("assets/images/df_bomber_ss.png");
        this.rm.onReady(this.init.bind(this));
        
        
        this.init();
    }

    init () {
        this.player = new Player(this.canvas, this.ctx, this.rm.get("assets/images/df_bomber_ss.png"));
        this.start();
    }
    
    update (dt) {
        this.player.update(dt);
        // this.sprite.update(dt);
    }
    
    render () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
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