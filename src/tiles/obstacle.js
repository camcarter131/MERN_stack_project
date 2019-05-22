class Obstacle {
    constructor(ctx, position, img) {
        this.ctx = ctx;
        this.position = position;
        this.crateImg = img;
    }

    render() {
        this.ctx.drawImage(this.crateImg, this.position[0], this.position[1], 48, 48);
    }
}

module.exports = Obstacle;