const mongoose = require('mongoose');
const express = require("express");
const app = express();
const serv = require('http').Server(app);
const db = require('./config/keys').mongoURI;

const Game = require('./src/game/game');
const Grid = require('./src/game/grid');
const Player = require('./src/player/player');
const SOCKETS = {};
const PLAYERS = {};
const numPlayers = 4;

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

app.get("/", (req, res) => res.sendFile(__dirname + '/public/index.html'));
app.use('/public', express.static(__dirname + '/public'));
const port = process.env.PORT || 3000;
serv.listen(port);
const io = require('socket.io')(serv, {});

const game = new Game();
const grid = new Grid();
let gameStarted = false;

const start = () => { 
    setInterval(function () {
        let time = Date.now();
        let dt = (time - game.initialTime) / 1000.0;
        
        let pack = game.update(PLAYERS, dt);
        
        Object.values(SOCKETS).forEach(socket => {
            socket.emit('updatePlayer', {pack});
            socket.emit('updateGrid', grid);
        });
    
        game.initialTime = time;
    }, 1000 / 45) 
};

io.sockets.on('connection', (socket) => {
    SOCKETS[socket.id] = socket;
    PLAYERS[socket.id] = new Player(game.generateRandomPosition(), game);
    console.log(Object.keys(PLAYERS).length);

    if (numPlayers === Object.keys(PLAYERS).length && !gameStarted) {
        console.log('game started');
        gameStarted = true;
        start();
    }

    socket.on('keysPressed', keys => {
        const currentPlayer = PLAYERS[socket.id];
        currentPlayer.handleInput(currentPlayer.dt, keys);
    });

    socket.on('disconnect', () => {
        delete PLAYERS[socket.id];
        delete SOCKETS[socket.id];
    });
    
});
