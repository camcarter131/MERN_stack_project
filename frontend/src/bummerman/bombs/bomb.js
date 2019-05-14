import Item from '../item';

export default class Bomb {

    static renderBomb(ctx, position){
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(position[0], position[1], 48, 48);
    }

    static renderExplosion(ctx, position){
        ctx.fillStyle = "#ffff00";
        ctx.fillRect(position[0], position[1], 48, 48);
    }

    static renderExplosionObstacle(ctx, position){
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

        this.explodeBothWays = this.explodeBothWays.bind(this);
        
        // this.explode = this.explode.bind(this);
        // this.flicker = this.flicker.bind(this);
    }


    // static createBomb(grid, playerPosition, explosionSize) {
    //     

        
    //     Bomb.deploy(Grid.gridArray, position);
    //     setTimeout(() => Bomb.explode(Grid.gridArray, position, explosionSize), 3000);

    //     // setTimeout(this.flicker, 2000);
    // }



    explodeBothWays(
        position, 
        upClear=true, 
        downClear=true, 
        leftClear=true, 
        rightClear=true, 
        obstacleClearUp = true,
        obstacleClearDown = true,
        obstacleClearLeft = true,
        obstacleClearRight = true
        ) {

        // let position = this.player.grid.canvasToArray([this.player.position.x, this.player.position.y]);
        let row = position[0];
        let col = position[1];
        let gridArray = this.player.grid.gridArray;
        let bombSize = this.player.bombSize; //4
    

        for(let i = 1; bombSize >  0; i++){

            //UP---------

            //not on border, not a Wall, not an Obstacle => change gridArray letter to E && decrement bombsize
            if (
                row - i >= 1 
                && gridArray[row - i][col] !== 'W' 
                && gridArray[row - i][col] !== 'O' 
                && upClear 
                && obstacleClearUp
                ){
                bombSize -= 1;
                gridArray[row - i][col] = 'E';
                if (bombSize === 0) break;
            //if it is an obstacle OR we've already encountered an obstacle in the up direction
            } else if ((row - i >= 1 && upClear && gridArray[row - i][col] === 'O') || !obstacleClearUp) {
                //if it's the first obstacle we've encoutered, destroy it and set boolean false but still decrement so explosion doesn't extend
                if (obstacleClearUp) {
                    gridArray[row - i][col] = 'EO';
                    obstacleClearUp = false;
                }
                bombSize -= 1;
                if (bombSize === 0) break;
            //it's a wall
            } else {
                upClear = false;
            }

            //DOWN---------

            if (
                    row + i <= 15 
                    && gridArray[row + i][col] !== 'W' 
                    && gridArray[row + i][col] !== 'O' 
                    && downClear
                    && obstacleClearDown
                ){
                bombSize -= 1;
                gridArray[row + i][col] = 'E';
                if (bombSize === 0) break;
            } else if ((row + i <= 15 && downClear && gridArray[row + i][col] === 'O') || !obstacleClearDown) {
                //if it's the first obstacle we've encoutered, destroy it and set boolean false
                if (obstacleClearDown) {
                    gridArray[row + i][col] = 'EO';
                    obstacleClearDown = false;
                }
                bombSize -= 1;
                if (bombSize === 0) break;
            } else {
                downClear = false;
            }

            //LEFT---------

            if (
                    col - i >= 1 
                    && gridArray[row][col - i] !== 'W' 
                    && gridArray[row][col - i] !== 'O' 
                    && leftClear
                    && obstacleClearLeft
                ){
                bombSize -= 1;
                gridArray[row][col - i] = 'E';
                if (bombSize === 0) break;
            } else if ((col - i >= 1 && leftClear && gridArray[row][col - i] === 'O') || !obstacleClearLeft) {
                //if it's the first obstacle we've encoutered, destroy it and set boolean false
                if (obstacleClearLeft) {
                    gridArray[row][col - i] = 'EO';
                    obstacleClearLeft = false;
                }
                bombSize -= 1;
                
            } else {
                leftClear = false;
            }

            //RIGHT---------

            if (
                    col + i <= 15 
                    && gridArray[row][col + i] !== 'W' 
                    && gridArray[row][col + i] !== 'O' 
                    && rightClear
                    && obstacleClearRight
                ){
                bombSize -= 1;
                gridArray[row][col + i] = 'E';
                if (bombSize === 0) break;
            } else if ((col + i <= 15 && rightClear && gridArray[row][col + i] === 'O') || !obstacleClearRight) {
                //if it's the first obstacle we've encoutered, destroy it and set boolean false
                if (obstacleClearRight) {
                    gridArray[row][col + i] = 'EO';
                    obstacleClearRight = false;
                }
                bombSize -= 1;
                if (bombSize === 0) break;
            } else {
                rightClear = false;
            }
        }
    }

    clearExplosion(){
        let gridArray = this.player.grid.gridArray;

        for(let row = 0; row< gridArray.length; row++){
            for(let col = 0; col < gridArray.length; col++){
                if(gridArray[row][col] === 'E'){
                    gridArray[row][col] = 'X';
                } 
                else if(gridArray[row][col] === 'EO') {
                    gridArray[row][col] = Item.itemSelector();
                }
            }
        }
    }
    
    deploy() {
        const position = this.player.grid.canvasToArray([this.player.position.x, this.player.position.y]);
        this.player.grid.gridArray[position[0]][position [1]] = 'B';
        let row = position[0];
        let col = position[1];
        let gridArray = this.player.grid.gridArray;


        
        setTimeout(() => {

            
            this.player.grid.gridArray[position[0]][position[1]] = 'E';
            this.explodeBothWays(position);

            
        }, 2000);
        
        setTimeout(() => {
            this.clearExplosion();
            this.player.bombs.pickUpBomb(this);
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