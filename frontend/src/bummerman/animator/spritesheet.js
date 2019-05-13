import Sprite from "../player/sprite";

class SpriteSheet {
    constructor (img, config) {
        this.img = img;
        this.config = config || {
            rows: 0,
            cols: 0
        };
        this.frame = {
            width: this.img.width / (this.config.cols || 1),
            height: this.img.height / (this.config.rows || 1)
        };
        debugger;
    }

    generateSprites (ctx) {
        const output = [];
        for (let i = 0; i < this.config.rows; i++) {
            for (let j = 0; j < this.config.cols; i++) {
                output.push(new Sprite(
                    ctx.getImageData(
                        i * this.frame.width,
                        j * this.frame.height,
                        this.frame.width,
                        this.frame.height
                    ),
                    `bomber_${i}_${j}`
                ));
            }
        }

        return output;
    }
}

export default SpriteSheet;