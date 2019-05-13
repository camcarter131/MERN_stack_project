import Sprite from "../player/sprite";

class SpriteSheet {
    constructor (img, config) {
        this.img = img;
        this.config = config || {
            rows: 0,
            cols: 0
        };
    }

    generateSprites {
        const output = [];
        for (let i = 0; i < this.config.rows; i++) {
            for (let j = 0; j < this.config.cols; i++) {
                output.push(new Sprite()
            }
        }
    }
}

export default SpriteSheet;