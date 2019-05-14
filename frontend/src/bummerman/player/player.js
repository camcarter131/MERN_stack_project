import Bombs from '../bombs/bombs'
import { DOWN, UP, RIGHT, LEFT, SPACE } from '../keys';
import Input from '../input';

class Player { //extends Sprite {
    constructor (canvas, grid) {
        this.position = {
            x: 16 + 48,
            y: canvas.height - 34 - 48
        }
        
        this.renderSize = 48;
        this.radius = this.renderSize/2; 
        this.radius_partial = Math.sqrt((this.radius**2)/2);
        this.grid = grid;
        this.erase = this.erase.bind(this);
        this.inputHandler = new Input(this);
        this.bombs = new Bombs(this);
    }

    handleInput(dt) {

        if (this.inputHandler.isPressed(SPACE)) {
            this.bombs.deploy();
        }
        
        if (this.inputHandler.isPressed(DOWN) || this.inputHandler.isPressed('s')) {
            this.velocity.y = this.speed;
            this.velocity.x = 0;
            let gridCoords = this.grid.canvasToArray([this.position.x, this.position.y + this.radius + 5]);

            if (this.grid.gridArray[gridCoords[0]][gridCoords[1]] === 'W' || 
                this.grid.gridArray[gridCoords[0]][gridCoords[1]] === 'O') {
                    return null;
            } else {
                this.position.y += this.velocity.y * dt;
            }
        }
        if (this.inputHandler.isPressed(UP) || this.inputHandler.isPressed('w')) {
            this.velocity.y = this.speed;
            this.velocity.x = 0;
            let gridCoords = this.grid.canvasToArray([this.position.x, this.position.y]);
            if (this.grid.gridArray[gridCoords[0]][gridCoords[1]] === 'W' 
                || this.grid.gridArray[gridCoords[0]][gridCoords[1]] === 'O' ) {
                    return null;
            } else {
                this.position.y -= this.velocity.y * dt;
            }
        }

        if (this.inputHandler.isPressed(RIGHT) || this.inputHandler.isPressed('s')) {
            this.velocity.x = this.speed;
            this.velocity.y = 0;
            let gridCoords = this.grid.canvasToArray([this.position.x + 22, this.position.y + 20]);
            if (this.grid.gridArray[gridCoords[0]][gridCoords[1]] === 'W' 
                || this.grid.gridArray[gridCoords[0]][gridCoords[1]] === 'O') {
                    return null;
            } else {
                this.position.x += this.velocity.x * dt;
            }
        }
        if (this.inputHandler.isPressed(LEFT) || this.inputHandler.isPressed('w')) {
            this.velocity.x = this.speed;
            this.velocity.y = 0;
            let gridCoords = this.grid.canvasToArray([this.position.x - 4, this.position.y + 20]);
            if (this.grid.gridArray[gridCoords[0]][gridCoords[1]] === 'W' 
                || this.grid.gridArray[gridCoords[0]][gridCoords[1]] === 'O' ) {
                    return null;
            } else {
                this.position.x -= this.velocity.x * dt;
            }
        }
    }

    update (dt) {
        console.log('updating player');
        // this.handleInput(dt);
        // this.animation.update(dt);
    }

    render () {
        // debugger;
        // super.render();
        // this.animation.render("y", 1);
    }

}

export default Player;