const Input = require("../input");

class Sprite {
    constructor (canvas, ctx, img) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.img = img;

        this.inputHandler = new Input(this);

        this.size = {
            width: 32,
            height: 32
        };

        this.position = {
            x: 0,
            y: 0
        };

        this.speed = 100;
        this.velocity = {
            x: 0,
            y: 0
        };
        this.render = this.render.bind(this);

    }

    update (dt) {
        this.position.x += this.velocity.x * dt
        this.position.y += this.velocity.y * dt
    }

    render () {
        // debugger
        this.ctx.drawImage(this.img, 0, 0, this.size.width, this.size.height, this.position.x - (this.size.width/2), this.position.y - (this.size.height/2), 48, 48);// this.size.width, this.size.height);

    }

}

module.exports = Sprite;