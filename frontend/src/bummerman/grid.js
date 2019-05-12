
export default class Grid {

    constructor(canvas, ctx){
        // this.ctx = canvas.getContext("2d");
        this.ctx = ctx;
        this.height = canvas.height;
        this.width = canvas.width;
        this.gridArray = [...Array(13)].map(e => Array(13));
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

    populateGrid() {
        for (let x = 0; x < this.width; x += 48) {
            this.ctx.fillStyle = "#000000";
            this.ctx.fillRect(x, 0, 48, 48);
            this.ctx.fillRect(x, this.height-48, 48, 48);
        }

        for (let y = 0; y < this.height; y += 48) {
            this.ctx.fillStyle = "#000000";
            this.ctx.fillRect(0, y, 48, 48);
            this.ctx.fillRect(this.width-48, y, 48, 48);
        }

    }

}

