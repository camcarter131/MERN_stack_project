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


    socket.on('updatePlayer', data => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Flicker 
        Object.values(data.pack).forEach(player => {
            Grid.renderGame(ctx, player.grid)
        });

        Object.values(data.pack).forEach(player => {

            
            Player.render(ctx, player);
            if (socket.id === player.id) {
                let lives = document.getElementById('lives');
                let bombs = document.getElementById('bombs');
                
                while (lives.firstChild) {
                    lives.removeChild(lives.firstChild);
                }
    
                while (bombs.firstChild) {
                    bombs.removeChild(bombs.firstChild);
                }
                for (let i = 0; i < player.lives; i++) {
                    let heartIcon = document.createElement("IMG");
                    heartIcon.setAttribute("src", "https://raw.githubusercontent.com/camcarter131/MERN_stack_project/master/frontend/public/heart.png");
                    heartIcon.setAttribute("width", "48");
                    heartIcon.setAttribute("height", "48");
                    lives.appendChild(heartIcon);
                }
                for (let j = 0; j < player.bombQueue.length; j++) {
                    let bombIcon = document.createElement("IMG");
                    bombIcon.setAttribute("src", "https://raw.githubusercontent.com/camcarter131/MERN_stack_project/master/frontend/public/bomb.png");
                    bombIcon.setAttribute("width", "48");
                    bombIcon.setAttribute("height", "48");
                    bombs.appendChild(bombIcon);
                }
            }
                

        });
    });
});


