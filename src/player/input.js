const keys = require("./keys");
// const Bomb = require('./bombs/bomb');

class Input {
    constructor() {
        // this.player = player;
        this.pressedKeys = {};
        // console.log(document);
        // console.log(window);
    }

    setKey(e, status) {
        e.preventDefault();
        let key;
        switch (e.keyCode) {
            case 32:
                key = keys.SPACE;
                break;
            case 37:
                key = keys.LEFT;
                break;
            case 38:
                key = keys.UP;
                break;
            case 39:
                key = keys.RIGHT;
                break;
            case 40:
                key = keys.DOWN;
                break;
            default:
                // Convert ASCII codes to letters
                key = String.fromCharCode(e.keyCode);

        }

        this.pressedKeys[key] = status;
    }

    isPressed(key) {
        return this.pressedKeys[key];
    }

}

module.exports = Input;