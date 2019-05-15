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

var gp;

window.addEventListener("gamepadconnected", function (e) {
    // debugger
    // gamepad = e.gamepad;
    // console.log(e.gamepad);
    // console.log(`Gamepad connected at index ${e.gamepad.index}: ${e.gamepad.id}. ${e.gamepad.buttons.length} buttons, ${e.gamepad.axes.length} axes.`);
    // if (e.gamepad.buttons[12].pressed) console.log(gamepad.buttons[12]);
    gp = navigator.getGamepads()[0];
});

window.addEventListener("gamepaddisconnected", function (e) { gamepad = null; }, false);


document.addEventListener('keydown', (e) => {
    // clearPlayer();
    e.preventDefault();
    switch (e.keyCode) {
        case 32:
            keys.space = true;
            socket.emit('keysPressed', keys);
            break;
        case 37:
            keys.left = true;
            socket.emit('keysPressed', keys);
            break;
        case 38:
            keys.up = true;
            socket.emit('keysPressed', keys);
            break;
        case 39:
            keys.right = true;
            socket.emit('keysPressed', keys);
            break;
        case 40:
            keys.down = true;
            socket.emit('keysPressed', keys);
            break;
    }
});

document.addEventListener('keyup', (e) => {
    e.preventDefault();
    switch (e.keyCode) {
        case 32:
            keys.space = false;
            socket.emit('keysPressed', keys);
            break;
        case 37:
            keys.left = false;
            socket.emit('keysPressed', keys);
            break;
        case 38:
            keys.up = false;
            socket.emit('keysPressed', keys);
            break;
        case 39:
            keys.right = false;
            socket.emit('keysPressed', keys);
            break;
        case 40:
            keys.down = false;
            socket.emit('keysPressed', keys);
            break;
    }
});

function buttonPressed(b) {
    // debugger
    if (typeof (b) == "object") {
        return b.pressed;
    }
    return b == 1.0;
}

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    
    
    socket.on('updateGrid', data => {
        // console.log(gp);

        // [6, 7].forEach(i => {
        //     if (gamepad.axes[i] > 0) (i === 6) ? console.log('pressed RIGHT on D-PAD') : console.log('pressed DOWN on D-PAD');
        //     else if (gamepad.axes[i] < 0) (i === 6) ? console.log('pressed LEFT on D-PAD') : console.log('pressed UP on D-PAD');
        // });

        if (navigator.getGamepads()[0].axes[6] > 0) {
            console.log('pressed RIGHT on D-PAD');
            keys.right = true;
            socket.emit('keysPressed', keys);
        }
        else if (navigator.getGamepads()[0].axes[6] < 0) {
            console.log('pressed LEFT on D-PAD');
            keys.left = true;
            socket.emit('keysPressed', keys);
        } else {
            keys.right = false;
            keys.left = false;
            socket.emit('keysPressed', keys);
        }

        if (navigator.getGamepads()[0].axes[7] > 0) {
            console.log('pressed DOWN on D-PAD');
            keys.down = true;
            socket.emit('keysPressed', keys);
        }
        else if (navigator.getGamepads()[0].axes[7] < 0) {
            console.log('pressed UP on D-PAD');
            keys.up = true;
            socket.emit('keysPressed', keys);
        } else {
            keys.down = false;
            keys.up = false;
            socket.emit('keysPressed', keys);
        }

        [0, 1, 2, 3].forEach(btnIdx => {
            if (navigator.getGamepads()[0].buttons[btnIdx].value > 0) {
                console.log('pressed FIRE BOMB');
                keys.space = true;
                socket.emit('keysPressed', keys);
            } else {
                keys.space = false;
                socket.emit('keysPressed', keys);
            }
        });


        // if (navigator.getGamepads()[0].axes[7] > 0) console.log('pressed DOWN on D-PAD');
        // else if (navigator.getGamepads()[0].axes[7] < 0) console.log('pressed UP on D-PAD');

        // if (gamepad.buttons[0].value === 1) console.log('pressed A');

        // console.log(gamepad);
        // console.log(gamepad.buttons[12]);
        // gamepad.buttons.forEach((btn, idx) => {if (btn.pressed && (idx !== 6 || idx !== 7)) {debugger;console.log(btn, idx)}});
        // for (let i = 0; i < gamepad.buttons.length; i++) {
        //     if (i === 6 || i === 7) continue;
        //     else if (gamepad.buttons[i].pressed) console.log(gamepad.buttons[i], i);
        // }
        // if (gamepad.buttons[12].pressed) {
        //     console.log(gamepad.buttons[12]);
        //     console.log(gamepad.buttons[12].value);
        // } else if (gamepad.buttons[13].pressed) {
        //     console.log(gamepad.buttons[13].value);
        // }
        // if (buttonPressed(gamepad.buttons[1])) {
        //     // console.log(gamepad.buttons);
        // } else if (buttonPressed(gamepad.buttons[3])) {
        //     // console.log(gamepad.buttons);
        // }


        
        ctx.clearRect(0,0,canvas.width, canvas.height);

        Grid.renderGame(ctx, data.grid)

        Object.values(data.pack).forEach(player => {
            Player.render(ctx, player);
        });
    });
    // socket.on('updatePlayer', data => {

    // });

    // socket.on('clearCanvas', () => {
    //     // ctx.clearRect(0, 0, canvas.width, canvas.height)
    //     // ctx.fillStyle = '#fff';
    //     // ctx.beginPath();
    //     // ctx.arc(player.position.x, player.position.y, 20, 0, 2 * Math.PI);
    //     // ctx.closePath();
    //     // ctx.fill();
    // });

    
});


