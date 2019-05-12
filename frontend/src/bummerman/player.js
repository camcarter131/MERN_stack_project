class Player {
    constructor () {
        const canvas = document.getElementById('canvas');
        this.canvasContext = canvas.getContext('2d');

        this.size = { 
            width: (canvas.width / 15) * (0.75),
            height: (canvas.height / 15) * (0.75)
        };

        this.position = {
            x: 0,
            y: 0
        };

        this.color = '#2a52be';
    }

    render () {
        this.canvasContext.fillStyle = this.color;
        this.canvasContext.fillCircle(this.position.x, this.position.y, this.size.width / 2, 0, 360);
    }
}

export default Player;