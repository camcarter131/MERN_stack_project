const mongoose = require('mongoose');
const express = require("express");
const app = express();
const serv = require('http').Server(app);
const db = require('./config/keys').mongoURI;

// const player = require('./frontend/src/bummerman/player/player');



mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

app.get("/", (req, res) => res.sendFile(__dirname + '/frontend/public/index.html'));
app.use('/public', express.static(__dirname + '/public'));
const port = process.env.PORT || 5000;
serv.listen(port);

const io = require('socket.io')(serv,{});

const players = {};
// const connectionsLimit = 4;


io.sockets.on('connection', (socket) => {
    console.log('socket connection');

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });








    
    // if(io.engine.clientsCount > connectionsLimit) {
    //     socket.emit('err', { message: 'reach the limit of connections' });
    //     socket.disconnect();
    //     console.log('Disconnected...');
    //     return;
    // }



    // examples of how to transfer data back and forth
    // socket.on('happy', function(data) {
    //     console.log('happy (received from client) ' + data.reason);
    // });

    // socket.emit('serverMsg', {
    //     msg: 'you have one life remaining'
    // });
});