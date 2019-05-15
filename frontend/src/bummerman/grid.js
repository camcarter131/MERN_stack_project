import Wall from './wall';
import Obstacle from './object';
import Bomb from './bombs/bomb';
import Item from './item';
import Background from './background';

export default class Grid {

    constructor(canvas, ctx, crateImg, grassImg, wallImg){
        this.ctx = ctx;
        this.height = canvas.height;
        this.width = canvas.width;
        this.gridArray = [...Array(17)].map(e => ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"]);
        this.crateImg = crateImg;
        this.grassImg = grassImg;
        this.blockImg = wallImg;
        this.createWalls();
        this.createObstacles();
        this.renderGame(this.ctx);
    }

    //populates gridarray with W's
    createWalls(){
        let rowTop = 0;
        let rowBottom = 16;
        for (let col = 0; col < this.gridArray[0].length; col+= 1) {
            this.gridArray[rowTop][col] = "W";
            this.gridArray[rowBottom][col] = "W";
        }
        let colLeft = 0;
        let colRight = 16;
        for (let row = 0; row < this.gridArray[0].length; row+= 1) {
            this.gridArray[row][colLeft] = "W";
            this.gridArray[row][colRight] = "W";
        }
        for(let i=2; i<this.gridArray[0].length-1; i+=2){
            for(let j = 2; j < this.gridArray[0].length-1; j += 2){
                this.gridArray[i][j] = "W";
            }
        }

    }

    createObstacles(){
        for(let i=1; i<this.gridArray[0].length-1; i+=1){
            for(let j = 1; j < this.gridArray[0].length-1; j += 1){
                // if (i === 15 && j === 15) break;
                if ((i === 1 && j === 15) || (i === 1 && j === 1) || (i === 15 && j === 1) || (i === 15 && j === 15) 
                    || (i === 1 && j === 2) || (i === 2 && j === 1) 
                    || (i === 15 && j === 2) || (i === 14 && j === 1)
                    || (i === 15 && j === 14) || (i === 14 && j === 15)
                    || (i === 1 && j === 14) || (i === 2 && j === 15) ) continue;
                if (this.gridArray[i][j] === "W") continue;
                if (Math.random() < 0.35) {
                    this.gridArray[i][j] = "O";
                }
            }
        }
    }

    // Goes through master array and renders element in legend

     //legend
    //W = immovable wall
    //O = perishable obstacle
    //B = bomb
    //F = bomb fire
    //X = background image
    //I1 = item 1 etc.....

    renderGame() {
        this.gridArray.forEach((row, x) => {
            row.forEach((el, y) => {
                let canvasCoords = this.arrayToCanvas([x, y]);
                switch(el) {
                    case "X":
                        let background = new Background(this.ctx, canvasCoords, this.grassImg);
                        background.render();
                        break;
                    case "W":
                        let wall = new Wall(this.ctx, canvasCoords, this.crateImg)
                        wall.render();
                        break;
                    case "O":
                        let obstacle = new Obstacle(this.ctx, canvasCoords, this.blockImg)
                        obstacle.render();
                        break;
                    case "B":
                        Bomb.renderBomb(this.ctx, canvasCoords);
                        break;
                    case "E":
                        Bomb.renderExplosion(this.ctx, canvasCoords);
                        break;
                    case "EO":
                        Bomb.renderExplosionObstacle(this.ctx, canvasCoords);
                        break;
                    case "I1":
                        Item.renderI1(this.ctx, canvasCoords);
                        break;
                    case "I2":
                        Item.renderI2(this.ctx, canvasCoords);
                        break;
                    case "I3":
                        Item.renderI3(this.ctx, canvasCoords);
                        break;
                    case "I4":
                        Item.renderI4(this.ctx, canvasCoords);
                        break;
                    case "TXT":
                        Item.renderI2(this.ctx, canvasCoords);
                        break;
                    default:
                        break;
                }
            });
        });
    }


   

    arrayToCanvas(arrayCoordinates) {
        return [48*arrayCoordinates[1], 48*arrayCoordinates[0]];
    }


    canvasToArray(canvasPosition) {
        //where x is the row and y is the column in the nested array.
        let x = Math.floor(canvasPosition[1]/48) * 48;
        let y = Math.floor(canvasPosition[0]/48) * 48;
        return [x / 48, y / 48];
    }


    drawGrid() {
        for (let x = 0; x <= this.width; x += 48) {
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.height);
        }

        for (let y = 0; y <= this.height; y += 48) {
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.width, y);
        }
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();
    }

    // populateGrid() {
    //     //COmment in if you want a bigass black border
    //     // for (let x = 0; x < this.width; x += 48) {
    //     //     this.ctx.fillStyle = "#000000";
    //     //     this.ctx.fillRect(x, 0, 48, 48);
    //     //     this.ctx.fillRect(x, this.height-48, 48, 48);
    //     // }

    //     // for (let y = 0; y < this.height; y += 48) {
    //     //     this.ctx.fillStyle = "#000000";
    //     //     this.ctx.fillRect(0, y, 48, 48);
    //     //     this.ctx.fillRect(this.width-48, y, 48, 48);
    //     // }

    // }

}

