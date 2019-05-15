const Player = require('./player');
class Game {
    constructor () {
        this.startingPositions = [
            {x:70, y:70},
            {x:700, y:700},
            {x:70, y:700},
            {x:700, y:70}
        ];

        // this.numPlayers = numPlayers;
        // this.canvas = canvas;
        // this.ctx = ctx;

        // this.rm = new ResourceManager();

        // this.grid = new Grid(canvas, ctx);
        // // this.player = new Player(canvas, ctx);
        // window.gridArray = this.grid.gridArray;

        this.initialTime = Date.now();
        this.addPlayer = this.addPlayer.bind(this);
        this.deletePlayer = this.deletePlayer.bind(this);
        this.isReady = this.isReady.bind(this);
        this.start = this.start.bind(this);
        // this.rm.load("assets/images/df_bomber_ss.png");
        // this.rm.onReady(this.init.bind(this));


        // this.init();
        this.players = {};
    }

    generateRandomPosition () {
        return this.startingPositions.pop();
    }

    isReady () {
        return Object.keys(this.players).length === this.numPlayers;
    }

    addPlayer (socketId) {
        this.players[socketId] = new Player(this.startingPositions.pop(), this);
        if (this.isReady()) {
            this.init();
        }
    }

    deletePlayer (socketId) {
        delete this.players[socketId];
    } 

    init() {
        console.log('game started');

        // Object.keys(this.players).forEach(socketId => {
        //     console.log(this.players[socketId]);
        //     SOCKETS[socketId].emit('startGame', { game: this });
        // });


        // this.start();

        // Object.keys(this.sockets).forEach(socketId => { 
            
        //     console.log(`socket: ${this.sockets[socketId]}`)
        //     console.log(`socketId: ${socketId}`)
        //     console.log(this.start)
        //     this.sockets[socketId].emit('startGame', {start: this.start})
        
        // });

    }

    update(players, dt) {
        const pack = [];

        Object.values(players).forEach(player => {
            player.dt = dt;
            player.update(dt);
            pack.push(player);
        });

        return pack;
        // Object.values(this.sockets).forEach(socket => socket.emit('updateGame', this));
        

        // this.sprite.update(dt);
    }

    render(ctx) {
        // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // this.grid.renderGame();
        // this.player.render();

        // this.sprite.render();
        Object.values(this.sockets).forEach(socket => {
            socket.player.render(ctx);
        });
    }

    start() {
        let time = Date.now();
        let dt = (time - this.initialTime) / 1000.0;

        this.update(dt);
        console.log('loooped')
        // this.render();

        this.initialTime = time;
        requestAnimationFrame(this.start);
    }

}

module.exports = Game;