class Animator {
    constructor () {
        this.assets = {};
    }

    addAsset (asset) {
        this.assets[asset.src] = asset;
    }

    deleteAsset (asset) {
        delete this.assets[asset];
    }
}

export default Animator;