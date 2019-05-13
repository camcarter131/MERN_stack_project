export default class Bomb {

    static renderBomb(ctx, position){
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(position[0], position[1], 48, 48);
    }

    static renderExplosion(ctx, position){
        ctx.fillStyle = "#ffff00";
        ctx.fillRect(position[0], position[1], 48, 48);
    }

    constructor(player) {
        // this.img = '';
        // this.flickerIntervalId = null;
        // this.ctx = ctx;
        // this.grid = grid;
        this.player = player;
        this.deploy = this.deploy.bind(this);
        
        // this.explode = this.explode.bind(this);
        // this.flicker = this.flicker.bind(this);
    }


    // static createBomb(grid, playerPosition, explosionSize) {
    //     

        
    //     Bomb.deploy(Grid.gridArray, position);
    //     setTimeout(() => Bomb.explode(Grid.gridArray, position, explosionSize), 3000);

    //     // setTimeout(this.flicker, 2000);
    // }

    deploy() {
        const position = this.player.grid.canvasToArray([this.player.position.x, this.player.position.y]);
        this.player.grid.gridArray[position[0]][position[1]] = 'B';
        let row = position[0];
        let col = position[1];
        let gridArray = this.player.grid.gridArray;
        
        setTimeout(() => {
            this.player.grid.gridArray[position[0]][position[1]] = 'E';


            if (row - 1 >= 1 && gridArray[row - 1][col] != 'W') gridArray[row - 1][col] = 'E';
            if (row + 1 <= 15 && gridArray[row + 1][col] != 'W') gridArray[row + 1][col] = 'E';
            if (col - 1 >= 1 && gridArray[row][col - 1] != 'W') gridArray[row][col - 1] = 'E';
            if (col + 1 <= 15 && gridArray[row][col + 1] != 'W') gridArray[row][col + 1] = 'E';
            
        }, 2000);
        
        setTimeout(() => {
               this.player.bombs.pickUp(this);
            
                if (row - 1 >= 1 && gridArray[row - 1][col] != 'W') gridArray[row - 1][col] = 'X';
                if (row + 1 <= 15 && gridArray[row + 1][col] != 'W') gridArray[row + 1][col] = 'X';
                if (col - 1 >= 1 && gridArray[row][col - 1] != 'W') gridArray[row][col - 1] = 'X';
                if (col + 1 <= 15 && gridArray[row][col + 1] != 'W') gridArray[row][col + 1] = 'X';
                this.player.grid.gridArray[position[0]][position[1]] = 'X';
            }, 3000);
        
    }

    // explode(gridArray, position, explosionSize) {
    //     let row = position[0];
    //     let col = position[1];

    //     gridArray[row][col] = 'E';

    
    // }
    

    // flicker() {
    //     this.flickerIntervalId = setInterval(() => { }, 100);
    // }

}