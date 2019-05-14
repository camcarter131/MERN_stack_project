import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './root';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/store';
import io from 'socket.io-client';
import Game from './bummerman/game';

// ReactDOM.render(<Root store={configureStore()}/>, document.getElementById('root'));
// const socket = prod ? io() : io('http://localhost:5000');
// debugger
const socket = io('http://localhost:5000');

socket.on('playerList', (players) => {
    // debugger
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext('2d');
    const game = new Game(players,canvas, ctx);
    // debugger
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();





// const prod = process.env.REACT_APP_PROD;



// this is received from client
// socket.on('news', function (data) {
//     console.log(data);
// });

// socket.on('serverMsg', function(data) {
//     console.log(data.msg);
// });

// // 
// socket.emit('happy', {
//     reason: 'had cake today'
// });