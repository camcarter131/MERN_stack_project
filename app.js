const mongoose = require('mongoose');
const express = require("express");
const app = express();
const serv = require('http').Server(app);
const db = require('./config/keys').mongoURI;

const Game = require('./src/game/game');
// const ResourceManager = require('./src/resource_manager/resource_manager');
const Grid = require('./src/game/grid');
const Player = require('./src/player/player');
const SOCKETS = {};
const PLAYERS = {};
const numPlayers = 2;

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

app.get("/", (req, res) => res.sendFile(__dirname + '/public/index.html'));
app.use('/public', express.static(__dirname + '/public'));
const port = process.env.PORT || 3000;
serv.listen(port);
const io = require('socket.io')(serv, {});
const images = {};

const grassImg = "https://raw.githubusercontent.com/camcarter131/MERN_stack_project/master/frontend/public/assets/images/grass.png";
const wallImg = "https://raw.githubusercontent.com/camcarter131/MERN_stack_project/master/frontend/public/assets/images/crates.png";
const crateImg = "https://raw.githubusercontent.com/camcarter131/MERN_stack_project/master/frontend/public/assets/images/crates_real.png";
// const bombImg = "https://raw.githubusercontent.com/camcarter131/MERN_stack_project/master/frontend/public/bomb3.png";
const bombImg = "https://raw.githubusercontent.com/camcarter131/MERN_stack_project/master/frontend/public/bomb.png";
// const bombImg = "https://raw.githubusercontent.com/camcarter131/MERN_stack_project/master/frontend/public/bomb2.png";
const game = new Game();
const grid = new Grid(grassImg, wallImg, crateImg, bombImg);

// const rm = new ResourceManager();
// rm.load("./src/images/df_bomber_ss.png");
let gameStarted = false;
const img = "https://raw.githubusercontent.com/camcarter131/MERN_stack_project/master/frontend/public/assets/images/df_bomber_ss.png";
// const img = "/aa-flex/public/src/images/df_bomber_ss.png";

const start = () => { 
    setInterval(function () {
        let time = Date.now();
        let dt = (time - game.initialTime) / 1000.0;
        
        let pack = game.update(PLAYERS, dt, grid, img);
        
        Object.values(SOCKETS).forEach(socket => {
            socket.emit('clearCanvas');
            socket.emit('updatePlayer', {pack});
            // socket.emit('updateGrid', grid);
        });
    
        game.initialTime = time;
    }, 1000 / 30) 
};

io.sockets.on('connection', (socket) => {
    SOCKETS[socket.id] = socket;
    PLAYERS[socket.id] = new Player(game.generateRandomPosition(), game, grid);

    if (numPlayers === Object.keys(PLAYERS).length && !gameStarted) {
        console.log('game started');
        gameStarted = true;
        start();
    }

    socket.on('keysPressed', keys => {
        // socket.emit('clearCanvas');
        const currentPlayer = PLAYERS[socket.id];
        currentPlayer.handleInput(currentPlayer.dt, keys);
    });

    socket.on('disconnect', () => {
        delete PLAYERS[socket.id];
        delete SOCKETS[socket.id];
    });

    // socket.on('Wall', (img) => {
    //     images['Wall'] = img;
    //     grid.wallImg = img;
    // })
    // socket.on('Grass', (img) => {
    //     images['Grass'] = img;
    //     grid.grassImg = img;
    // })
    // socket.on('Crate', (img) => {
    //     images['Crate'] = img;
    //     grid.crateImg = img;
    // })
    
});
