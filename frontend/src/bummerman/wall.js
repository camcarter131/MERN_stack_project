export default class Wall {
    constructor(ctx, position, img) {
        this.ctx = ctx;
        this.position = position;
        this.wallImg = img;
    }

    render() {
        this.ctx.drawImage(this.wallImg, this.position[0], this.position[1], 48, 48)
    }

    // render() {
    //     this.ctx.fillStyle = "#000000";
    //     this.ctx.fillRect(this.position[0], this.position[1], 48, 48);
    // }
}