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
        // debugger;
    }

    generateSprites (ctx) {
        debugger;
        const tmpCanvas = new OffscreenCanvas(this.img.width, this.img.height);
        const tmpcc = tmpCanvas.getContext('2d');

        const output = [];
        tmpcc.drawImage(this.img, 0, 0);

        for (let i = 0; i < this.config.rows; i++) {
            for (let j = 0; j < this.config.cols; i++) {
                output.push(new Sprite(
                    tmpcc.getImageData(
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