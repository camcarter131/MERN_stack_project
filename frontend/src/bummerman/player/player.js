import Bomb from '../bomb';
import { DOWN, UP, RIGHT, LEFT } from '../keys';
import Input from '../input';
import Sprite from './sprite';
import Animation from '../animator/animation';

class Player extends Sprite {
    constructor (canvas, ctx, img) {
        super (canvas, ctx, img);

        this.position.x = (canvas.width/2) + 24;
        this.position.y = (canvas.width/2) + 24;

        this.erase = this.erase.bind(this);

        this.inputHandler = new Input(this);

        this.animation = new Animation(ctx, this, { frames: [1, 2], loop: true });
    }

    handleInput(dt) {
        if (this.inputHandler.isPressed(DOWN) || this.inputHandler.isPressed('s')) {
            this.position.y += this.velocity.y * dt;
        }
        if (this.inputHandler.isPressed(UP) || this.inputHandler.isPressed('w')) {
            this.position.y -= this.velocity.y * dt;
        }

        if (this.inputHandler.isPressed(RIGHT) || this.inputHandler.isPressed('s')) {
            this.position.x += this.velocity.x * dt;
        }
        if (this.inputHandler.isPressed(LEFT) || this.inputHandler.isPressed('w')) {
            this.position.x -= this.velocity.x * dt;
        }
    }

    erase () {
        this.ctx.clearRect(this.position.x, this.position.y, this.width, this.height);
        // this.ctx.fillStyle = "#ffffff";
        // this.ctx.beginPath();
        // this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        // this.ctx.closePath();
        // this.ctx.fill();
    }

    update (dt) {
        this.handleInput(dt);
        this.animation.update(dt);
    }

    render () {
        // debugger;
        super.render();
        this.animation.render("y", 1);
    }

    // render () {
    //     this.ctx.fillStyle = this.color;
    //     this.ctx.beginPath();
    //     this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    //     this.ctx.closePath();
    //     this.ctx.fill();
    // }

    renderBomb() {
        let x = this.position.x - this.width; 
        let y = this.position.y -this.height;
        this.ctx.fillStyle = "#000000";
        this.ctx.beginPath();
        this.ctx.arc(this.position.x - this.width, this.position.y - this.height, this.radius, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.fill();
        setTimeout(() => {
            this.ctx.fillStyle = "#ffffff";
            this.ctx.beginPath();
            this.ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
            this.ctx.closePath();
            this.ctx.fill();
        }, 2000);
    }
        

    dropBomb () {
        let bomb = new Bomb(this.ctx, this.position);
        bomb.render();
    }
}

export default Player;