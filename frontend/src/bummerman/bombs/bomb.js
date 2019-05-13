export default class Bomb {
    // Constructor no longer needed as we are not doing instances of Bombs
    // constructor(ctx) {
    //     this.img = '';
    //     this.flickerIntervalId = null;

    //     this.explode = this.explode.bind(this);
    //     this.flicker = this.flicker.bind(this);
    // }

    static createBomb(grid, playerPosition, explosionSize) {
        const position = grid.canvasToArray(playerPosition);

        
        Bomb.deploy(Grid.gridArray, position);
        setTimeout(() => Bomb.explode(Grid.gridArray, position, explosionSize), 3000);

        // setTimeout(this.flicker, 2000);
    }

    static deploy(gridArray, position) {
        gridArray[position[0]][position[1]] = 'B';
    }

    static explode(gridArray, position, explosionSize) {
        let row = position[0];
        let col = position[1];

        gridArray[row][col] = 'E';

        if (row - 1 >= 0) gridArray[row - 1][col] = 'E';
        if (row + 1 <= 15) gridArray[row + 1][col] = 'E';
        if (col - 1 >= 0) gridArray[row][col - 1] = 'E';
        if (col + 1 <= 15) gridArray[row][col + 1] = 'E';
    }
    
    static render(ctx, position) {
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(position[0], position[1], 48, 48);
    }

    // flicker() {
    //     this.flickerIntervalId = setInterval(() => { }, 100);
    // }

}