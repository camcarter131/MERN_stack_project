import Sprite from "../player/sprite";

class SpriteSheet {
    constructor(img, config) {
        this.img = img;
        this.config = config || {
            rows: 0,
            cols: 0,
            name: 'sprite'
        };
        this.frame = {
            width: Math.floor(this.img.width / (this.config.cols || 1)),
            height: Math.floor(this.img.height / (this.config.rows || 1))
        };
        // debugger;
    }

    // generateSprites() {
    //     // debugger;
    //     // this.tmpCanvas = new OffscreenCanvas(this.img.width, this.img.height);
    //     // this.tmpcc = this.tmpCanvas.getContext('2d');

    //     // this.tmpcc.drawImage(this.img, 0, 0);

    //     const output = [];

    //     // const c = document.createElement('canvas');
    //     // c.width = this.img.width;
    //     // c.height = this.img.height;
    //     const c = new OffscreenCanvas(this.img.width, this.img.height);
    //     const cc = c.getContext('2d');
    //     cc.drawImage(this.img, 0, 0, 96, 96, 0, 0, 96, 96);

    //     // let imgData = cc.getImageData(0, 0, 32, 32);
    //     let imgBM = createImageBitmap(this.img,{ premultiplyAlpha: 'premultiply'}).then(() => {
    //         output.push(imgBM);
    //     });
    //     // let imgData2 = cc.getImageData(32, 0, 32, 32);
    //     // let imgData3 = cc.getImageData(64, 0, 32, 32);
    //     // for (let i = 0; i < this.img.width / 32; i++) {
    //     //     for (let j = 0; j < this.img.height / 32; i++) {
    //     //         let imgData = cc.getImageData(i * this.frame.width,
    //     //             j * this.frame.height,
    //     //             this.frame.width,
    //     //             this.frame.height
    //     //         );
    //     //         output.push(new Sprite(imgData, `bomber_${i}_${j}`));
    //     //         debugger;
    //     //     }
    //     // }
    //     // output.push(imgData2); output.push(imgData3);
    //     output.forEach(data => {
    //         for (let i = 0; i < data.width; i++) {
    //             for (let j = 1; j < data.height; j++) {
    //                 const n = ((data.width * i))
    //             }
    //         }
    //     });
    //     // debugger;

    //     return output;
    // }
}

export default SpriteSheet;