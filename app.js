const mongoose = require('mongoose');
const express = require("express");
const app = express();
const serv = require('http').Server(app);
const db = require('./config/keys').mongoURI;


const Game = require('./src/game');
const Player = require('./src/player');
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
let gameStarted = false;

const start = () => { 
    setInterval(function () {
        let time = Date.now();
        let dt = (time - game.initialTime) / 1000.0;
        

        let pack = game.update(PLAYERS, dt);
        // console.log(pack);
        Object.values(SOCKETS).forEach(socket => {
            // console.log(pack);
            socket.emit('updatePlayer', {pack});
        });
        // game.render();
    
        game.initialTime = time;
    }, 1000 / 60) 
    // requestAnimationFrame(start);
};

io.sockets.on('connection', (socket) => {
    SOCKETS[socket.id] = socket;
    PLAYERS[socket.id] = new Player(game.generateRandomPosition(), game);
    // console.log(SOCKETS);
    console.log(Object.keys(PLAYERS).length);

    if (numPlayers === Object.keys(PLAYERS).length && !gameStarted) {
        console.log('game started');
        gameStarted = true;
        start();
    }

    socket.on('keysPressed', keys => {
        // Object.values(PLAYERS).forEach(player => player.handleInput(player.dt, keys));
        const currentPlayer = PLAYERS[socket.id];
        currentPlayer.handleInput(currentPlayer.dt, keys);
        // console.log(socket.id);
    });

    socket.on('disconnect', () => {
        delete PLAYERS[socket.id];
        delete SOCKETS[socket.id];
    });
    
});



//  ******** Trial 1


// function startGame (game) {
//     let time = Date.now();
//     let dt = (time - game.initialTime) / 1000.0;

//     game.update(dt);
//     console.log('loooped')
//     // this.render();

//     game.initialTime = time;
//     requestAnimationFrame(startGame);
// }


// ******** Trial 3
// const game = new Game(2)

// io.sockets.on('connection', (socket) => {
//     // debugger;
//     // console.log(socket.id);
//     SOCKETS[socket.id] = socket;
//     game.addPlayer(socket.id);
//     // console.log(document);
//     // socket.emit('newPlayer', { socket });

//     // socket.on('startGame', data => {
//     //     startGame(data.game, data.socket)     
//     // });

//     socket.on('disconnect', () => {
//         // console.log('socket disconnected');
//         // socket.emit('playerDisconnect', { socketId: socket.id });
//         game.deletePlayer(socket.id);
//     });

//     // socket.emit('startGame', {start: start});
// });


// ***  Trial 2
// setInterval(() => {

//     Object.keys(game.sockets).forEach(socketId => {
//         console.log(game.sockets.socketId);
//         // game.sockets[socketId].player.update(1);
//         game.sockets.socketId.emit('updatePos', game.sockets[socketId].player.position);
//     });


// }, 1000/30);

// const start = () => {
//     let time = Date.now();
//     let dt = (time - game.initialTime) / 1000.0;

//     game.update(dt);
//     game.render();

//     game.initialTime = time;
//     requestAnimationFrame(game.start.bind(game));
// }