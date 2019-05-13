class Bomb {
    constructor(ctx, position) {
        this.ctx = ctx;
        this.position = position;
    }

    render() {
        this.ctx.fillStyle = "#000000";
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.fill();
    }
}

export default Bomb;