export default class Input {
    constructor (player) {
        this.player = player;
        this.handleInput = this.handleInput.bind(this);
        document.addEventListener('keydown', this.handleInput.bind(this));
    }

    handleInput(e) {
        e.preventDefault();
        switch (e.keyCode) {
            case 37:
                this.player.erase()
                this.player.position.x -= this.player.width;
                this.player.render()
                break;
            case 38:
                this.player.erase()
                this.player.position.y -= this.player.width;
                this.player.render()
                break;
            case 39:
                this.player.erase()
                this.player.position.x += this.player.width;
                this.player.render()
                break;
            case 40:
                this.player.erase()
                this.player.position.y += this.player.width;
                this.player.render()
                break;
            case 32:
                // this.player.dropBomb()
                this.player.renderBomb();
                break;
        }
    }
    
}