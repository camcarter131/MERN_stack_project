import io from 'socket.io-client';
import Player from './player';
// import Input from './input';
// import * as serviceWorker from './serviceWorker';

const socket = io('http://localhost:3000');
// serviceWorker.unregister();

// const inputHandler = new Input();

// window.addEventListener('blur', () => inputHandler.pressedKeys = {});
const keys = {'up':false, 'down': false, 'left': false, 'right': false, 'space': false};

document.addEventListener('keydown', (e) => {
    e.preventDefault();
    switch (e.keyCode) {
        case 32:
            // key = keys.SPACE;
            keys.space = true;
            socket.emit('keysPressed', keys)
            break;
        case 37:
            // key = keys.LEFT;
            keys.left = true;
            socket.emit('keysPressed', keys)
            break;
        case 38:
            // key = keys.UP;
            keys.up = true;
            socket.emit('keysPressed', keys)
            break;
        case 39:
            // key = keys.RIGHT;
            keys.right = true;
            socket.emit('keysPressed', keys)
            break;
        case 40:
            // key = keys.DOWN;
            keys.down = true;
            socket.emit('keysPressed', keys)
            break;
    }
});

document.addEventListener('keyup', (e) => {
    e.preventDefault();
    switch (e.keyCode) {
        case 32:
            // key = keys.SPACE;
            keys.space = false;
            socket.emit('keysPressed', keys)
            break;
        case 37:
            // key = keys.LEFT;
            keys.left = false;
            socket.emit('keysPressed', keys)
            break;
        case 38:
            // key = keys.UP;
            keys.up = false;
            socket.emit('keysPressed', keys)
            break;
        case 39:
            // key = keys.RIGHT;
            keys.right = false;
            socket.emit('keysPressed', keys)
            break;
        case 40:
            // key = keys.DOWN;
            keys.down = false;
            socket.emit('keysPressed', keys)
            break;
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    socket.on('updatePlayer', data => {
        // console.log(data)

        Object.values(data.pack).forEach(player => {
            return (
                Player.render(ctx, player)
            )

        })
    });
});


// const game = new Game(2);

// socket.on('gameInit', data => {debugger; console.log(`${data.socket.id} was here!`)});
// socket.on('startGame', data => {
//     console.log('fregreio');
//     console.log(data);
//     return data.start()
// });

// function startGame(game) {
//     let time = Date.now();
//     let dt = (time - game.initialTime) / 1000.0;

//     game.update(dt);
//     console.log('loooped')
//     // this.render();

//     game.initialTime = time;
//     requestAnimationFrame(startGame);
// }

// socket.on('startGame', game => {
//     startGame(game)
// });

// socket.on('updateGame', game => {
//     game.render(ctx);
// }); 

// socket.on('newPlayer', data => {
//     game.addSocket(data.socket);
// });

// socket.on('deletePlayer', data => {
//     game.deleteSocket(data.playerId);
// });