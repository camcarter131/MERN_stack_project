class Animator {
    constructor (ctx, spriteSheet) {
        this.assets = {};
        spriteSheet.generateSprites(ctx).forEach(sprite => this.addAsset(sprite));
        // debugger;
    }

    addAsset (asset) {
        this.assets[asset.src] = asset;
    }

    deleteAsset (asset) {
        delete this.assets[asset];
    }
}

export default Animator;