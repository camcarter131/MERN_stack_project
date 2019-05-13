const mongoose = require('mongoose');
const express = require("express");
const app = express();
const serv = require('http').Server(app);
const db = require('./config/keys').mongoURI;


mongoose
.connect(db, { useNewUrlParser: true })
.then(() => console.log("Connected to MongoDB successfully"))
.catch(err => console.log(err));

app.get("/", (req, res) => res.sendFile(__dirname + '/frontend/public/index.html'));
app.use('/public', express.static(__dirname + '/public'));
const port = process.env.PORT || 5000;
serv.listen(port);


// app.listen(port, () => console.log(`Server is running on port ${port}`));

var SOCKET_LIST = {};

const io = require('socket.io')(serv,{});


io.sockets.on('connection', (socket) => {
    console.log('socket connection');

    socket.id = Math.random();
    SOCKET_LIST[socket.id] = socket;

    // socket.on('happy', function(data) {
    //     console.log('happy (received from client) ' + data.reason);
    // });

    // socket.emit('serverMsg', {
    //     msg: 'you have one life remaining'
    // });
});