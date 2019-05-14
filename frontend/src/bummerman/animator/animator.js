import Sprite from "../player/sprite";

class Animator {
    constructor (ctx, spriteSheet) {
        this.assets = {};
        this.animations = {};

        this.ctx = ctx;
        this.generateSprites(spriteSheet); 
    }

    generateSprites (spriteSheet) {
        for (let i = 0; i < spriteSheet.config.rows; i++) {
            for (let j = 0; j < spriteSheet.config.cols; j++) {
                // debugger;
                createImageBitmap(
                    spriteSheet.img,                // img data
                    i * spriteSheet.frame.width,    // sx: 
                    j * spriteSheet.frame.height,   // sy:
                    spriteSheet.frame.width,        // sw:
                    spriteSheet.frame.height        // sh:
                ).then(res => {
                    const sprite = new Sprite(res, `${spriteSheet.config.name}_${i}_${j}`);
                    this.addAsset(sprite);
                });
            }
        }
        
    }
    
    addAsset (sprite) {
        this.assets[sprite.name] = sprite.data;
    }

    deleteAsset (asset) {
        delete this.assets[asset];
    }

    createAnimation (animName, frames) {
        this.animations[animName] = frames;
    }

    deleteAnimation (animName) {
        delete this.animations[animName]
    }
    
    render () {
        // if (this.assets["bomber_0_0"]) this.ctx.drawImage(this.assets.bomber_0_0, 64, 64);
    }
}

export default Animator;