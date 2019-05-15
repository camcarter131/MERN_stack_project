export default class Background {
    constructor(ctx, position, img) {
        this.ctx = ctx;
        this.position = position;
        this.grassImg = img;
    }

    render() {
        this.ctx.drawImage(this.grassImg, this.position[0], this.position[1], 48, 48)
    }

    // render() {
    //     this.ctx.fillStyle = "#000000";
    //     this.ctx.fillRect(this.position[0], this.position[1], 48, 48);
    // }
}