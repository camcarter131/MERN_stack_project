import io from 'socket.io-client';
import Player from './player';

const socket = io('http://localhost:3000');

// window.addEventListener('blur', () => inputHandler.pressedKeys = {});
const keys = {'up':false, 'down': false, 'left': false, 'right': false, 'space': false};

document.addEventListener('keydown', (e) => {
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

    socket.on('updatePlayer', data => {
        Object.values(data.pack).forEach(player => {
            return (
                Player.render(ctx, player)
            )

        })
    });
});