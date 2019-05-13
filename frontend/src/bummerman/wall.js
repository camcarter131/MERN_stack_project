export default class Wall {
    constructor(ctx, position) {
        this.ctx = ctx;
        this.position = position;
    }

    render() {
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(this.position[0], this.position[1], 48, 48);
    }
}