const Wall = require('../tiles/wall');
const Obstacle = require('../tiles/obstacle');
const Bomb = require('./bombs/bomb');
const Item = require('../tiles/item');
const Background = require('./background');

class Grid {
    constructor(grassImg, wallImg, crateImg) {
        this.gridArray = [...Array(17)].map(e => ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"]);
        this.createWalls();
        this.createObstacles();

        this.grassImgSrc = grassImg;
        this.wallImgSrc = wallImg;
        this.crateImgSrc = crateImg;



        // this.renderGame(this.ctx);
    }

    //populates gridArray with W's
    createWalls() {
        let rowTop = 0;
        let rowBottom = 16;
        for (let col = 0; col < this.gridArray[0].length; col += 1) {
            this.gridArray[rowTop][col] = "W";
            this.gridArray[rowBottom][col] = "W";
        }
        let colLeft = 0;
        let colRight = 16;
        for (let row = 0; row < this.gridArray[0].length; row += 1) {
            this.gridArray[row][colLeft] = "W";
            this.gridArray[row][colRight] = "W";
        }
        for (let i = 2; i < this.gridArray[0].length - 1; i += 2) {
            for (let j = 2; j < this.gridArray[0].length - 1; j += 2) {
                this.gridArray[i][j] = "W";
            }
        }

    }

    createObstacles() {
        
        for (let i = 1; i < this.gridArray[0].length - 1; i += 1) {
            for (let j = 1; j < this.gridArray[0].length - 1; j += 1) {
                // if (i === 15 && j === 15) break;
                if ((i === 1 && j === 15) || (i === 1 && j === 1) || (i === 15 && j === 1) || (i === 15 && j === 15)
                    || (i === 1 && j === 2) || (i === 2 && j === 1)
                    || (i === 15 && j === 2) || (i === 14 && j === 1)
                    || (i === 15 && j === 14) || (i === 14 && j === 15)
                    || (i === 1 && j === 14) || (i === 2 && j === 15)) continue;
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

    static renderGame(ctx, grid) {
        // const grassImgSrc = "https://raw.githubusercontent.com/camcarter131/MERN_stack_project/master/frontend/public/assets/images/grass.png";
        // const wallImgSrc = "https://github.com/camcarter131/MERN_stack_project/blob/master/frontend/public/assets/images/crates.png";
        // const crateImgSrc = "https://raw.githubusercontent.com/camcarter131/MERN_stack_project/master/frontend/public/assets/images/crates_real.png";

        const grassImg = new Image();
        grassImg.src = grid.grassImgSrc;
        const wallImg = new Image();
        wallImg.src = grid.wallImgSrc;
        const crateImg = new Image();
        crateImg.src = grid.crateImgSrc;
        
        grid.gridArray.forEach((row, x) => {
            row.forEach((el, y) => {
                let canvasCoords = [48 * y, 48 * x];
                switch (el) {
                    case "X":
                        let background = new Background(ctx, canvasCoords, grassImg);
                        background.render();
                        break;
                    case "W":
                        let wall = new Wall(ctx, canvasCoords, wallImg)
                        wall.render();
                        break;
                    case "O":
                        let obstacle = new Obstacle(ctx, canvasCoords, crateImg)
                        obstacle.render();
                        break;
                    case "B":
                        // let bombParams = {grid:this, position:canvasCoords, bombSize:4}
                        // let bomb = new Bomb(bombParams);
                        Bomb.renderBomb(ctx, canvasCoords);
                        break;
                    case "E":
                        Bomb.renderExplosion(ctx, canvasCoords);
                        break;
                    case "EO":
                        Bomb.renderExplosionObstacle(ctx, canvasCoords);
                        break;
                    case "I1":
                        Item.renderI1(ctx, canvasCoords);
                        break;
                    case "I2":
                        Item.renderI2(ctx, canvasCoords);
                        break;
                    case "I3":
                        Item.renderI3(ctx, canvasCoords);
                        break;
                    case "I4":
                        Item.renderI4(ctx, canvasCoords);
                        break;
                    case "TXT":
                        Item.renderI2(ctx, canvasCoords);
                        break;
                    default:
                        break;
                }
            });
        });
    }


    arrayToCanvas(arrayCoordinates) {
        return [48 * arrayCoordinates[1], 48 * arrayCoordinates[0]];
    }


    canvasToArray(canvasPosition) {
        //where x is the row and y is the column in the nested array.
        let x = Math.floor(canvasPosition[1] / 48) * 48;
        let y = Math.floor(canvasPosition[0] / 48) * 48;
        return [x / 48, y / 48];
    }

 
    // drawGrid() {
    //     this.height = canvas.height;
    //     this.width = canvas.width;
    //     for (let x = 0; x <= this.width; x += 48) {
    //         this.ctx.moveTo(x, 0);
    //         this.ctx.lineTo(x, this.height);
    //     }

    //     for (let y = 0; y <= this.height; y += 48) {
    //         this.ctx.moveTo(0, y);
    //         this.ctx.lineTo(this.width, y);
    //     }
    //     this.ctx.strokeStyle = "black";
    //     this.ctx.stroke();
    // }

}

module.exports = Grid;