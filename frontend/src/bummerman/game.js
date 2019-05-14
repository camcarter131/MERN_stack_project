const Grid= require("./grid");
const Player =require("./player/player");
const ResourceManager = require("./resource_manager/resource_manager");

class Game {
    constructor (players, canvas, ctx) {
        this.players = players;
        this.canvas = canvas;
        this.ctx = ctx;
        this.startingPositions = [{x: 64, y: canvas.height - 82},
        {x:64, y:56}, {x:canvas.width - 82, y:56},
        {x:canvas.width - 82, y:canvas.height - 82}];
        this.update = this.update.bind(this);
        this.init = this.init.bind(this);
        this.render = this.render.bind(this);
        this.rm = new ResourceManager();

        this.grid = new Grid(canvas, ctx);
        // this.player = new Player(canvas, ctx);

        this.initialTime = Date.now();

        
        this.rm.load("assets/images/df_bomber_ss.png");
        this.rm.onReady(this.init.bind(this));
        
        // this.init();
    }

    init () {
        this.players = Object.values(this.players).map((plyr) => (
         
            new Player(this.startingPositions.pop(), this.canvas, this.ctx, this.rm.get("assets/images/df_bomber_ss.png"), this.grid)
       
        ));
        this.start();
    }
    
    update (dt) {
        this.players.forEach((player) => {
            // debugger
            player.update(dt);
        })
        // this.sprite.update(dt);
    }
    
    render () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // this.grid.drawGrid();
        this.grid.renderGame();
        this.players.forEach((player) => {
            player.render();
        });
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

module.exports = Game;