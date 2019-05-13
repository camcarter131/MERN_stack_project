import Bomb from './bomb';
import { DOWN, UP, RIGHT, LEFT } from './keys';
import Input from './input';

class Player {
    constructor (canvas, ctx, grid) {
        this.radius = ((canvas.width / 15) * (0.75)) / 2;
        this.radius_partial = Math.sqrt((this.radius**2)/2);
        this.ctx = ctx;
        this.grid = grid;

        this.position = {
            x: (canvas.width/2) + 48,
            y: (canvas.height/2) + 48
        };
        
        this.width = canvas.width/15.0;
        this.height = canvas.height/15.0;
        
        this.speed = 100;
        this.velocity = {
            x: 0,
            y: 0
        };

        this.color = '#2a52be';
        this.erase = this.erase.bind(this);
        this.inputHandler = new Input(this);

    }

    handleInput(dt) {

        if (this.inputHandler.isPressed(DOWN) || this.inputHandler.isPressed('s')) {
            let gridCoords = this.grid.canvasToArray([this.position.x, this.position.y + this.radius]);
            let gridCoordsL = this.grid.canvasToArray([this.position.x - this.radius_partial, this.position.y + this.radius_partial]);
            let gridCoordsR = this.grid.canvasToArray([this.position.x + this.radius_partial, this.position.y + this.radius_partial]);

            if (this.grid.gridArray[gridCoords[0]][gridCoords[1]] === 'W' || this.grid.gridArray[gridCoordsL[0]][gridCoordsL[1]] === 'W' || this.grid.gridArray[gridCoordsR[0]][gridCoordsR[1]] === 'W') {
                return null
            } else {
                this.position.y += this.velocity.y * dt;
            }
        }
        if (this.inputHandler.isPressed(UP) || this.inputHandler.isPressed('w')) {
            let gridCoords = this.grid.canvasToArray([this.position.x, this.position.y - this.radius]);
            let gridCoordsL = this.grid.canvasToArray([this.position.x - this.radius_partial, this.position.y - this.radius_partial]);
            let gridCoordsR = this.grid.canvasToArray([this.position.x + this.radius_partial, this.position.y - this.radius_partial]);

            if (this.grid.gridArray[gridCoords[0]][gridCoords[1]] === 'W' || this.grid.gridArray[gridCoordsL[0]][gridCoordsL[1]] === 'W' || this.grid.gridArray[gridCoordsR[0]][gridCoordsR[1]] === 'W') {
                return null
            } else {
                this.position.y -= this.velocity.y * dt;
            }
        }

        if (this.inputHandler.isPressed(RIGHT) || this.inputHandler.isPressed('s')) {
            let gridCoords = this.grid.canvasToArray([this.position.x + this.radius, this.position.y]);
            let gridCoordsU = this.grid.canvasToArray([this.position.x + this.radius_partial, this.position.y - this.radius_partial]);
            let gridCoordsD = this.grid.canvasToArray([this.position.x + this.radius_partial, this.position.y + this.radius_partial]);
            if (this.grid.gridArray[gridCoords[0]][gridCoords[1]] === 'W' || this.grid.gridArray[gridCoordsU[0]][gridCoordsU[1]] === 'W' || this.grid.gridArray[gridCoordsD[0]][gridCoordsD[1]] === 'W') {
                return null
            }
            this.position.x += this.velocity.x * dt;
        }
        if (this.inputHandler.isPressed(LEFT) || this.inputHandler.isPressed('w')) {
            let gridCoords = this.grid.canvasToArray([this.position.x - this.radius, this.position.y]);
            let gridCoordsU = this.grid.canvasToArray([this.position.x - this.radius_partial, this.position.y - this.radius_partial]);
            let gridCoordsD = this.grid.canvasToArray([this.position.x - this.radius_partial, this.position.y + this.radius_partial]);
            if (this.grid.gridArray[gridCoords[0]][gridCoords[1]] === 'W' || this.grid.gridArray[gridCoordsU[0]][gridCoordsU[1]] === 'W' || this.grid.gridArray[gridCoordsD[0]][gridCoordsD[1]] === 'W') {
                return null
            }
            this.position.x -= this.velocity.x * dt;
        }
    }

    erase () {
        this.ctx.clearRect(this.position.x, this.position.y, this.width, this.height);
        // this.ctx.fillStyle = "#ffffff";
        // this.ctx.beginPath();
        // this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        // this.ctx.closePath();
        // this.ctx.fill();
    }

    update (dt) {
        this.handleInput(dt);
    }
 
    render () {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.fill();
    }

    renderBomb() {
        let x = this.position.x - this.width; 
        let y = this.position.y -this.height;
        this.ctx.fillStyle = "#000000";
        this.ctx.beginPath();
        this.ctx.arc(this.position.x - this.width, this.position.y - this.height, this.radius, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.fill();
        setTimeout(() => {
            this.ctx.fillStyle = "#ffffff";
            this.ctx.beginPath();
            this.ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
            this.ctx.closePath();
            this.ctx.fill();
        }, 2000);
    }
        

    dropBomb () {
        let bomb = new Bomb(this.ctx, this.position);
        bomb.render();
    }
}

export default Player;