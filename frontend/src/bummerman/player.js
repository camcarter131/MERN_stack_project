class Player {
    constructor (canvas, ctx) {
        this.radius = ((canvas.width / 15) * (0.75)) / 2;
        this.ctx = ctx;

        this.position = {
            x: canvas.width/2,
            y: canvas.height / 2
        };

        this.color = '#2a52be';
    }

    render () {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.fill();

    }
}

export default Player;