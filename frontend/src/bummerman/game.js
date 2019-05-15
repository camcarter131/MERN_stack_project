import Grid from "./grid";
import Player from "./player/player";
import ResourceManager from "./resource_manager/resource_manager";

class Game {
    constructor (canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.rm = new ResourceManager();
        this.rm.load("assets/images/df_bomber_ss.png");
        this.rm.load("assets/images/crates.png");
        this.rm.load("assets/images/grass.png");
        this.rm.load("assets/images/crates_real.png");
        this.rm.onReady(this.init.bind(this));

        this.grid = new Grid(
            canvas, 
            ctx, 
            this.rm.get("assets/images/crates.png"),
            this.rm.get("assets/images/grass.png"),
            this.rm.get("assets/images/crates_real.png")
        );
        // this.player = new Player(canvas, ctx);
        window.gridArray = this.grid.gridArray;

        this.initialTime = Date.now();

        
        
        
        this.init();
    }

    init () {
        this.player = new Player(this.canvas, this.ctx, this.rm.get("assets/images/df_bomber_ss.png"), this.grid);
        this.start();
    }
    
    update (dt) {
        this.player.update(dt);
        // this.sprite.update(dt);
    }
    
    render () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // this.grid.drawGrid();
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