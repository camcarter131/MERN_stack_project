import { SPACE, LEFT, UP, RIGHT, DOWN } from "./keys";
import Bomb from './bombs/bomb';

export default class Input {
    constructor (player) {
        this.player = player;
        this.pressedKeys = {};

        document.addEventListener('keydown', (e) => this.setKey(e, true));
        document.addEventListener('keyup', (e) => this.setKey(e, false));
        window.addEventListener('blur', () => this.pressedKeys = {})        
    }

    setKey(e, status) {
        e.preventDefault();
        let key;
        switch (e.keyCode) {
            case 32:
                key = SPACE;

                break;
            case 37:
                key = LEFT; 
                break;
            case 38:
                key = UP; 
                break;
            case 39:
                key = RIGHT; 
                break;
            case 40:
                key = DOWN; 
                break;
            default:
                // Convert ASCII codes to letters
                key = String.fromCharCode(e.keyCode);

        }

        this.pressedKeys[key] = status;
    }

    isPressed (key) {
        return this.pressedKeys[key];
    }
    
}