// import { DOWN, UP, RIGHT, LEFT, SPACE } from '../keys';
const Input = require('./input');
const keys = require("./keys");
const Sprite = require('./sprite');
const Bomb = require('../game/bombs/bomb');
const Item = require('../tiles/item');
// import Animation from '../animator/animation';

class Player {
    constructor(position, game, grid, img) {
        this.grid = grid;
        this.img = img;
        this.dt = 0;
        this.position = position;
        this.game = game;
        this.velocity = {
            x: 0,
            y: 0
        };
        this.speed = 200;
        this.size = {
            width: 32,
            height: 32
        };
        this.bombSize = 4;
        this.lives = 3;
        this.spaceBool = true;
        this.isKilled = true;
        // this.bombs = new Bombs(this);
        // this.bombQueue = [new Bomb(this.grid, this.position, this.bombSize)];
        // this.inputHandler = new Input(this);
        // this.handleInput = this.handleInput.bind(this);
        // super(canvas, ctx, img);
        // this.position.x = 16 + 48;
        // this.position.y = canvas.height - 34 - 48;
        this.renderSize = 48;
        this.radius = this.renderSize / 2;
        // this.radius_partial = Math.sqrt((this.radius ** 2) / 2);
        // this.grid = grid;
        // this.erase = this.erase.bind(this);
        // //5 refers to the total number of squares an explosion will cover
        // this.bombSize = 4;
        // this.bombs = new Bombs(this);
        // this.animation = new Animation(ctx, this, { frames: [1, 2], loop: true });
        // window.bombQueue = this.bombs.bombQueue;
        this.bombQueue = [];
        this.pickUpBomb();
        this.isKilled = true;
        // this.deathMonitoring = this.deathMonitoring.bind(this);
        this.lives = 3;
    }

    static deathMonitoring(row, col, player) {
        if (player.grid.gridArray[row][col] === 'E') {
            if (player.isKilled) {
                player.isKilled = false;
                player.lives -= 1;
                setTimeout(() => this.relocatePlayer(player), 1000);
                player.speed = 0;
                player.bombsQueue = [new Bomb(player)];
                // player.pickUpBomb();
                player.bombSize = 4;
                setTimeout(() => player.speed = 200, 1000);
                console.log(player.lives);
            }
        } else {
            player.isKilled = true;
        }
    }

    static relocatePlayer(player) {
        let respawns = [
            //bottom left
            [64, 734],
            //bottom right
            [736, 734],
            //top left
            [64, 64],
            //top right
            [736, 64]
        ]

        let randomLocation = respawns[Math.floor(Math.random() * respawns.length)];
        player.position.x = randomLocation[0];
        player.position.y = randomLocation[1];
    }


    // createBombs() {
    //     this.bombs = new Bombs(this);
    // }
    pickUpBomb() {
        let newBomb = new Bomb(this);
        this.bombQueue.push(newBomb);
    }

    deploy() {
        let bomb = this.bombQueue.pop();
        if (bomb) {
            bomb.deploy();
            setTimeout(this.pickUpBomb.bind(this), 3000);
            // this.player.statsChange();
        }
    }

    itemMonitoring(row, col) {
        switch (this.grid.gridArray[row][col]) {
            case "I1":
                this.pickUpBomb();
                setTimeout(() => this.grid.gridArray[row][col] = 'X', 500);
                break;
            case "I2":
                this.speed *= 2;
                this.grid.gridArray[row][col] = 'X';
                setTimeout(() => { this.speed /= 2 }, 5000);
                break;
            case "I3":
                this.bombSize += 4;
                setTimeout(() => { this.bombSize -= 4; }, 5000);
                this.grid.gridArray[row][col] = 'X';
                break;
            default:
                break;
        }
    }

    handleInput(dt, keys) {

        if (keys.space) {
            // let gridCoords = this.grid.canvasToArray([this.position.x, this.position.y]);
            // this.bombs.deploy();
            if (this.spaceBool) {
                this.spaceBool = false;
                this.deploy();
            } else {
                this.spaceBool = true;
            }
        }
        
        // let currPos = this.grid.canvasToArray([this.position.x, this.position.y]);
        // this.deathMonitoring(currPos[0], currPos[1]);


        if (keys.down) {
            this.velocity.y = this.speed;
            this.velocity.x = 0;
            let gridCoords = this.grid.canvasToArray([this.position.x, this.position.y + this.radius + 5]);
            // let gridCoordsL = this.grid.canvasToArray([this.position.x - this.radius_partial, this.position.y + this.radius_partial]);
            // let gridCoordsR = this.grid.canvasToArray([this.position.x + this.radius_partial, this.position.y + this.radius_partial]);

            // if (this.grid.gridArray[gridCoords[0]][gridCoords[1]] === 'W' || this.grid.gridArray[gridCoordsL[0]][gridCoordsL[1]] === 'W' || this.grid.gridArray[gridCoordsR[0]][gridCoordsR[1]] === 'W') {
            //     return null
            // } else {
            // }
            this.itemMonitoring(gridCoords[0], gridCoords[1]);

            if (this.grid.gridArray[gridCoords[0]][gridCoords[1]] === 'W'
                || this.grid.gridArray[gridCoords[0]][gridCoords[1]] === 'O') {
                return null
            } else {
                this.position.y += this.velocity.y * dt;
            }
        }
        if (keys.up) {
            this.velocity.y = this.speed;
            this.velocity.x = 0;
            let gridCoords = this.grid.canvasToArray([this.position.x, this.position.y]);
            // let gridCoordsL = this.grid.canvasToArray([this.position.x - this.radius_partial, this.position.y - this.radius_partial]);
            // let gridCoordsR = this.grid.canvasToArray([this.position.x + this.radius_partial, this.position.y - this.radius_partial]);

            // if (this.grid.gridArray[gridCoords[0]][gridCoords[1]] === 'W' || this.grid.gridArray[gridCoordsL[0]][gridCoordsL[1]] === 'W' || this.grid.gridArray[gridCoordsR[0]][gridCoordsR[1]] === 'W') {
            //     return null
            // } else {
            // }
            this.itemMonitoring(gridCoords[0], gridCoords[1]);

            if (this.grid.gridArray[gridCoords[0]][gridCoords[1]] === 'W'
                || this.grid.gridArray[gridCoords[0]][gridCoords[1]] === 'O') {
                return null
            } else {
                this.position.y -= this.velocity.y * dt;
            }
        }

        if (keys.right) {
            this.velocity.x = this.speed;
            this.velocity.y = 0;
            let gridCoords = this.grid.canvasToArray([this.position.x + 22, this.position.y + 20]);
            // let gridCoordsU = this.grid.canvasToArray([this.position.x + this.radius_partial, this.position.y - this.radius_partial]);
            // let gridCoordsD = this.grid.canvasToArray([this.position.x + this.radius_partial, this.position.y + this.radius_partial]);
            // if (this.grid.gridArray[gridCoords[0]][gridCoords[1]] === 'W' || this.grid.gridArray[gridCoordsU[0]][gridCoordsU[1]] === 'W' || this.grid.gridArray[gridCoordsD[0]][gridCoordsD[1]] === 'W') {
            //     return null
            // }
            this.itemMonitoring(gridCoords[0], gridCoords[1]);

            if (this.grid.gridArray[gridCoords[0]][gridCoords[1]] === 'W'
                || this.grid.gridArray[gridCoords[0]][gridCoords[1]] === 'O') {
                return null
            } else {
                this.position.x += this.velocity.x * dt;
            }
        }
        if (keys.left) {
            this.velocity.x = this.speed;
            this.velocity.y = 0;
            let gridCoords = this.grid.canvasToArray([this.position.x - 4, this.position.y + 20]);
            // let gridCoordsU = this.grid.canvasToArray([this.position.x - this.radius_partial, this.position.y - this.radius_partial]);
            // let gridCoordsD = this.grid.canvasToArray([this.position.x - this.radius_partial, this.position.y + this.radius_partial]);
            // if (this.grid.gridArray[gridCoords[0]][gridCoords[1]] === 'W' || this.grid.gridArray[gridCoordsU[0]][gridCoordsU[1]] === 'W' || this.grid.gridArray[gridCoordsD[0]][gridCoordsD[1]] === 'W') {
            //     return null
            // }
            this.itemMonitoring(gridCoords[0], gridCoords[1]);

            if (this.grid.gridArray[gridCoords[0]][gridCoords[1]] === 'W'
                || this.grid.gridArray[gridCoords[0]][gridCoords[1]] === 'O') {
                return null
            } else {
                this.position.x -= this.velocity.x * dt;
            }
        }
    }

    static render (ctx, player) {
        const img = new Image();
        img.src = player.img;
        player.img = img;

        let x = Math.floor(player.position.y / 48) * 48;
        let y = Math.floor(player.position.x / 48) * 48;

        let currPos = [x/48,y/48];
        this.deathMonitoring(currPos[0], currPos[1], player);
        
        ctx.drawImage(player.img, 0, 0, player.size.width, player.size.height, player.position.x - (player.size.width / 2), player.position.y - (player.size.height / 2), 48, 48);
    }

    // renderBomb() {
    //     let x = this.position.x - this.width; 
    //     let y = this.position.y -this.height;
    //     this.ctx.fillStyle = "#000000";
    //     this.ctx.beginPath();
    //     this.ctx.arc(this.position.x - this.width, this.position.y - this.height, this.radius, 0, 2 * Math.PI);
    //     this.ctx.closePath();
    //     this.ctx.fill();
    //     setTimeout(() => {
    //         this.ctx.fillStyle = "#ffffff";
    //         this.ctx.beginPath();
    //         this.ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
    //         this.ctx.closePath();
    //         this.ctx.fill();
    //     }, 2000);
    // }


    // dropBomb () {
    //     let bomb = new Bomb(this.ctx, this.position);
    //     bomb.render();
    // }
}

module.exports = Player;