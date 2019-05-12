
export default class Grid {

    constructor(canvas, ctx){
        // this.ctx = canvas.getContext("2d");
        this.ctx = ctx;
        this.height = canvas.height;
        this.width = canvas.width;
    }

    drawGrid() {

        //640x640  15 squares 
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
}

