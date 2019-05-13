class Animation {
    constructor(ctx, sprite, config) {
        this.ctx = ctx;
        this.sprite = sprite;
        this.frames = config.frames;
        this.frameWidth = Math.floor(this.sprite.img.width / 3);
        this._index = 0;

        this.frameCountBuffer = config.frameCountBuffer || 20;
        this.frameCount = 0;

        this.config = config || {
            loop: true,
            row: 1,
            animCount: 1
        }
        window.spritevel = this.sprite.velocity;
    }

    update(dt) {
        this.frameCount++;
        if (this.frameCount < this.frameCountBuffer) return;
        else {
            this._index = ++this._index % this.frames.length;
            this.frameCount = 0;
        }
    }

    render(axis, dir) {
        if (dir > 0) {
            (this.sprite.velocity[axis] > 0) ?
                this.ctx.drawImage(this.sprite.img, this.frames[this._index] * this.frameWidth, 0, this.frameWidth, this.frameWidth, 0, 0, 48, 48) :
                this.ctx.drawImage(this.sprite.img, 0 * this.frameWidth, 0, this.frameWidth, this.frameWidth, 0, 0, 48, 48);
        } else {
            (this.sprite.velocity[axis] > 0) ?
                this.ctx.drawImage(this.sprite.img, this.frames[this._index] * this.frameWidth, 0, this.frameWidth, this.frameWidth, 0, 0, 48, 48) :
                this.ctx.drawImage(this.sprite.img, 0 * this.frameWidth, 0, this.frameWidth, this.frameWidth, 0, 0, 48, 48);
        }
    }
}

export default Animation;