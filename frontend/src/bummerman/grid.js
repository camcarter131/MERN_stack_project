
export default class Grid {

    constructor(canvas, ctx){
        this.ctx = ctx;
        this.height = canvas.height;
        this.width = canvas.width;
        this.gridArray = [...Array(15)].map(e => ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"]);
        this.createWalls();
        this.renderGame(this.ctx);
    }

    //populates gridarray with W's
    createWalls(){
        for(let i=1; i<this.gridArray[0].length; i+=2){
            for(let j = 1; j < this.gridArray[0].length; j += 2){
                this.gridArray[i][j] = "W";
            }
        }
    }

    // Goes through master array and renders element in legend

    renderGame() {
        this.gridArray.forEach((row, x) => {
            row.forEach((el, y) => {
                let canvasCoords = this.arrayToCanvas([x, y]);
                switch(el) {
                    case "W":
                        this.renderWall(this.ctx, canvasCoords);
                        break;
                    default:
                        break;
                }
            });
        });
    }

    renderWall(ctx, canvasCoords) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(canvasCoords[0], canvasCoords[1], 48, 48);
    }

  







    //hard code initial gridarray
    //function to make that array reflect in canvas

    //legend
    //W = immovable wall
    //O = perishable obstacle
    //B = bomb
    //F = bomb fire
    //X = background image

    arrayToCanvas(arrayCoordinates) {
        return [48*arrayCoordinates[1], 48*arrayCoordinates[0]];
    }

    canvasToArray(canvasPosition) {
        return [canvasPosition[1] / 48, canvasPosition[0] / 48];
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

