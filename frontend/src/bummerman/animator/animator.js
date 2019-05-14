import { debug } from "util";

class Animator {
    constructor (ctx, spriteSheet) {
        this.assets = {};
        this.ctx = ctx;
        this.generateSprites(spriteSheet); //.forEach(sprite => this.addAsset(sprite));
        window.assets = this.assets;
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
                ).then(res => this.addAsset(res, `${spriteSheet.config.name}_${i}_${j}`));
            }
        }
        
    }
    
    addAsset (asset, name) {
        this.assets[name] = asset;
    }

    deleteAsset (asset) {
        delete this.assets[asset];
    }
    
    render () {
        // Object.values(this.assets).forEach((sprite, idx) => this.ctx.drawImage(sprite, idx*48, 64));
        // debugger;
        if (this.assets["bomber_0_0"]) this.ctx.drawImage(this.assets.bomber_0_0, 64, 64);
    }
}

export default Animator;