import io from 'socket.io-client';
import Player from './player/player';
import Grid from './game/grid';

const socket = io('http://localhost:3000');

// window.addEventListener('blur', () => inputHandler.pressedKeys = {});
const keys = {'up':false, 'down': false, 'left': false, 'right': false, 'space': false};

// const clearPlayer = () => {
//     ctx.fillStyle = '#000000';
//     ctx.beginPath();
//     ctx.arc(player.position.x, player.position.y, 20, 0, 2 * Math.PI);
//     ctx.closePath();
//     ctx.fill();
// };


document.addEventListener('keydown', (e) => {
    // clearPlayer();
    e.preventDefault();
    switch (e.keyCode) {
        case 32:
            keys.space = true;
            socket.emit('keysPressed', keys)
            break;
        case 37:
            keys.left = true;
            socket.emit('keysPressed', keys)
            break;
        case 38:
            keys.up = true;
            socket.emit('keysPressed', keys)
            break;
        case 39:
            keys.right = true;
            socket.emit('keysPressed', keys)
            break;
        case 40:
            keys.down = true;
            socket.emit('keysPressed', keys)
            break;
    }
});

document.addEventListener('keyup', (e) => {
    e.preventDefault();
    switch (e.keyCode) {
        case 32:
            keys.space = false;
            socket.emit('keysPressed', keys)
            break;
        case 37:
            keys.left = false;
            socket.emit('keysPressed', keys)
            break;
        case 38:
            keys.up = false;
            socket.emit('keysPressed', keys)
            break;
        case 39:
            keys.right = false;
            socket.emit('keysPressed', keys)
            break;
        case 40:
            keys.down = false;
            socket.emit('keysPressed', keys)
            break;
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    // socket.on('updateGrid', grid => {
    //     // ctx.clearRect(0,0,canvas.width, canvas.height);
    //     Grid.renderGame(ctx, grid)
    // });
    socket.on('updatePlayer', data => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Grid.renderGame(ctx, grid);
        // console.log(data);
        Object.values(data.pack).forEach(player => {
            // console.log(player)
            Player.render(ctx, player);
            Grid.renderGame(ctx, player.grid)
        });
    });

    // socket.on('clearCanvas', () => {
    //     // ctx.clearRect(0, 0, canvas.width, canvas.height)
    //     // ctx.fillStyle = '#fff';
    //     // ctx.beginPath();
    //     // ctx.arc(player.position.x, player.position.y, 20, 0, 2 * Math.PI);
    //     // ctx.closePath();
    //     // ctx.fill();
    // });

    
});


