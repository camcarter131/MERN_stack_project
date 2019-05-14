const mongoose = require('mongoose');
const express = require("express");
const app = express();
const serv = require('http').Server(app);
const db = require('./config/keys').mongoURI;
// const Game = require('./frontend/src/bummerman/game');

// const player = require('./frontend/src/bummerman/player/player');



mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

app.get("/", (req, res) => res.sendFile(__dirname + '/public/index.html'));
app.use('/public', express.static(__dirname + '/public'));
const port = process.env.PORT || 3000;
serv.listen(port);

const io = require('socket.io')(serv, {});

io.sockets.on('connection', (socket) => {
    console.log('socket connected');
});