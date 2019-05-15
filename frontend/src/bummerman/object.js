export default class Object {
    constructor(ctx, position, crateImg) {
        this.ctx = ctx;
        this.position = position;
        this.crateImg = crateImg
    }

    // render() {
    //     this.ctx.fillStyle = "#834437";
    //     this.ctx.fillRect(this.position[0], this.position[1], 48, 48);
    // }
    render() {
        this.ctx.drawImage(this.crateImg, this.position[0], this.position[1], 48, 48)
    }
}