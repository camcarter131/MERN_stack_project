export default class Object {
    constructor(ctx, position) {
        this.ctx = ctx;
        this.position = position;
    }

    render() {
        this.ctx.fillStyle = "#834437";
        this.ctx.fillRect(this.position[0], this.position[1], 48, 48);
    }
}