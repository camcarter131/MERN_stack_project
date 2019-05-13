class Sprite {
    constructor (canvas, ctx, src) {
        this.img = new Image();
        this.img.src = src;
        this.canvas = canvas;
        this.ctx = ctx;

        this.size = {
            width: 32,
            height: 32
        };

        this.img.onload = this.render.bind(this);
    }

    render () {
        // debugger;
        this.ctx.drawImage(this.img, 0, 0, this.size.width, this.size.height, 0, 0, this.size.width, this.size.height);
    }
}

export default Sprite;