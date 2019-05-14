import Bombs from '../bombs/bombs'
import { DOWN, UP, RIGHT, LEFT, SPACE } from '../keys';
import Input from '../input';
import Sprite from './sprite';
import Animation from '../animator/animation';

class Player extends Sprite {
    constructor (canvas, ctx, img, grid) {
        super (canvas, ctx, img);
        this.position.x = 16+48;
        this.position.y = canvas.height - 34-48;
        this.renderSize = 48;
        this.radius = this.renderSize/2; 
        this.radius_partial = Math.sqrt((this.radius**2)/2);
        this.grid = grid;
        this.erase = this.erase.bind(this);
        this.inputHandler = new Input(this);
        //5 refers to the total number of squares an explosion will cover
        this.bombSize = 4;
        this.lives = 3 ;
        this.bombs = new Bombs(this);
        this.spaceBool = true;
        this.isKilled = true;
        this.shouldEndGame = true;
        this.animation = new Animation(ctx, this, { frames: [1, 2], loop: true });
        window.bombQueue = this.bombs.bombQueue;
        this.deathMonitoring = this.deathMonitoring.bind(this);
    }

    itemMonitoring(row, col){
        switch(this.grid.gridArray[row][col]){
            case "I1":
                this.bombs.pickUpBomb();
                this.grid.gridArray[row][col] = 'X';
                break;
            case "I2":
                this.speed *= 2;
                this.grid.gridArray[row][col] = 'X';
                setTimeout(() => {this.speed /= 2; }, 5000);
                break;
            case "I3":
                this.bombSize *= 2;
                setTimeout(() => { this.bombSize /= 2; }, 5000);
                this.grid.gridArray[row][col] = 'X';
                break;
            default:
                break;
        }
    }

    relocatePlayer() {
        let respawns = [
            //bottom left
            [64, this.canvas.height - 82],
            //bottom right
            [this.canvas.width - 80, this.canvas.height - 82],
            //top left
            [64, 64],
            //top right
            [this.canvas.width - 80, 64]
        ]
 
        let randomLocation = respawns[Math.floor(Math.random() * respawns.length)];
        this.position.x = randomLocation[0];
        this.position.y = randomLocation[1];
        // this.position.x = this.canvas.width - 80;
        // this.position.y = 64;
    }

    deathMonitoring(row, col) {
        if (this.grid.gridArray[row][col] === 'E') {
            if (this.isKilled) {
                this.isKilled = false;
                this.lives -= 1;
                setTimeout(() => this.relocatePlayer(), 1000); 
                console.log(this.lives);
                this.speed = 0;
                setTimeout(() => this.speed = 200, 1000)
            }
        } else {
            this.isKilled = true;
        }
    }

    livesDepleted(){
        if(this.lives === 0 && this. shouldEndGame) {
            this.shouldEndGame = false;

            this.speed = 0;
            this.size.width = 0;
            this.size.height = 0;

            var a = setInterval(() => {
                let randRow = Math.floor(Math.random() * this.grid.gridArray.length);
                let randCol = Math.floor(Math.random() * this.grid.gridArray.length);

                if (this.grid.gridArray[randRow][randCol] !== "W") {
                    this.grid.gridArray[randRow][randCol] = "W";
                }
            }, 1);
            // a(); 
            
            setTimeout(() => clearInterval(a), 10000); 
                
            // if(this.lives === 0){
            //     alert("GAME OVER, send 0.001 bitcoins to stefandabroski@gmail.com to play again");
            // }
        }
        
    }

    handleInput(dt) {
        let currPos = this.grid.canvasToArray([this.position.x, this.position.y]);


        this.deathMonitoring(currPos[0], currPos[1]);
        this.itemMonitoring(currPos[0], currPos[1]);
        this.livesDepleted(); 

        if (this.inputHandler.isPressed(SPACE)) {
                if (this.spaceBool){
                    this.spaceBool = false;
                    this.bombs.deploy();
                }
        } else {
            this.spaceBool = true;
        }
        
        if (this.inputHandler.isPressed(DOWN) || this.inputHandler.isPressed('s')) {
            this.velocity.y = this.speed;
            this.velocity.x = 0;
            let gridCoords = this.grid.canvasToArray([this.position.x, this.position.y + this.radius + 5]);
            // let gridCoordsL = this.grid.canvasToArray([this.position.x - this.radius_partial, this.position.y + this.radius_partial]);
            // let gridCoordsR = this.grid.canvasToArray([this.position.x + this.radius_partial, this.position.y + this.radius_partial]);

            // if (this.grid.gridArray[gridCoords[0]][gridCoords[1]] === 'W' || this.grid.gridArray[gridCoordsL[0]][gridCoordsL[1]] === 'W' || this.grid.gridArray[gridCoordsR[0]][gridCoordsR[1]] === 'W') {
            //     return null
            // } else {
            // }
            // this.deathMonitoring(gridCoords[0], gridCoords[1]);
            // this.itemMonitoring(gridCoords[0], gridCoords[1]);

            if (this.grid.gridArray[gridCoords[0]][gridCoords[1]] === 'W' 
            || this.grid.gridArray[gridCoords[0]][gridCoords[1]] === 'O') {
                return null;
            } else {
                this.position.y += this.velocity.y * dt;
            }
        }
        if (this.inputHandler.isPressed(UP) || this.inputHandler.isPressed('w')) {
            this.velocity.y = this.speed;
            this.velocity.x = 0;
            let gridCoords = this.grid.canvasToArray([this.position.x, this.position.y]);
            // let gridCoordsL = this.grid.canvasToArray([this.position.x - this.radius_partial, this.position.y - this.radius_partial]);
            // let gridCoordsR = this.grid.canvasToArray([this.position.x + this.radius_partial, this.position.y - this.radius_partial]);

            // if (this.grid.gridArray[gridCoords[0]][gridCoords[1]] === 'W' || this.grid.gridArray[gridCoordsL[0]][gridCoordsL[1]] === 'W' || this.grid.gridArray[gridCoordsR[0]][gridCoordsR[1]] === 'W') {
            //     return null
            // } else {
            // }
            // this.deathMonitoring(gridCoords[0], gridCoords[1]);
            // this.itemMonitoring(gridCoords[0], gridCoords[1]);

            if (this.grid.gridArray[gridCoords[0]][gridCoords[1]] === 'W' 
            || this.grid.gridArray[gridCoords[0]][gridCoords[1]] === 'O' ) {
                return null
            } else {
                this.position.y -= this.velocity.y * dt;
            }
        }

        if (this.inputHandler.isPressed(RIGHT) || this.inputHandler.isPressed('s')) {
            this.velocity.x = this.speed;
            this.velocity.y = 0;
            let gridCoords = this.grid.canvasToArray([this.position.x + 22, this.position.y + 20]);
            // let gridCoordsU = this.grid.canvasToArray([this.position.x + this.radius_partial, this.position.y - this.radius_partial]);
            // let gridCoordsD = this.grid.canvasToArray([this.position.x + this.radius_partial, this.position.y + this.radius_partial]);
            // if (this.grid.gridArray[gridCoords[0]][gridCoords[1]] === 'W' || this.grid.gridArray[gridCoordsU[0]][gridCoordsU[1]] === 'W' || this.grid.gridArray[gridCoordsD[0]][gridCoordsD[1]] === 'W') {
            //     return null
            // }
            // this.deathMonitoring(gridCoords[0], gridCoords[1]);
            // this.itemMonitoring(gridCoords[0], gridCoords[1]);

            if (this.grid.gridArray[gridCoords[0]][gridCoords[1]] === 'W' 
            || this.grid.gridArray[gridCoords[0]][gridCoords[1]] === 'O') {
                return null
            } else {
                this.position.x += this.velocity.x * dt;
            }
        }
        if (this.inputHandler.isPressed(LEFT) || this.inputHandler.isPressed('w')) {
            this.velocity.x = this.speed;
            this.velocity.y = 0;
            let gridCoords = this.grid.canvasToArray([this.position.x - 4, this.position.y + 20]);
            // debugger
            // let gridCoordsU = this.grid.canvasToArray([this.position.x - this.radius_partial, this.position.y - this.radius_partial]);
            // let gridCoordsD = this.grid.canvasToArray([this.position.x - this.radius_partial, this.position.y + this.radius_partial]);
            // if (this.grid.gridArray[gridCoords[0]][gridCoords[1]] === 'W' || this.grid.gridArray[gridCoordsU[0]][gridCoordsU[1]] === 'W' || this.grid.gridArray[gridCoordsD[0]][gridCoordsD[1]] === 'W') {
            //     return null
            // }
            // this.deathMonitoring(gridCoords[0], gridCoords[1]);
            // this.itemMonitoring(gridCoords[0], gridCoords[1]);

            if (this.grid.gridArray[gridCoords[0]][gridCoords[1]] === 'W' 
            || this.grid.gridArray[gridCoords[0]][gridCoords[1]] === 'O' ) {
                return null
            } else {
                this.position.x -= this.velocity.x * dt;
            }
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
        // this.animation.update(dt);
    }

    render () {
        // debugger;

        super.render();
        document.getElementById("lives").innerHTML = `num lives: ${this.lives}`;
        document.getElementById("bombs").innerHTML = `num bombs ${this.bombs.bombQueue.length}`;
        //https://t6.rbxcdn.com/fcf99f49b7677fad75fbba9cb0281f09


        // this.animation.render("y", 1);
    }
}

export default Player;