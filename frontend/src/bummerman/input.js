class Input {
    constructor (player) {
        this.player = player;
        document.addEventListener('keyDown', this.handleInput.bind(this));
    }

    handleInput (e) {
        e.preventDefault();

        switch (e.keyCode) {
            case '37':
                player.position.x -= player.size.width / 2;
                break;
            case '38':
                player.position.y -= player.size.width / 2;
                break;
            case '39':
                player.position.x += player.size.width / 2;
                break;
            case '40':
                player.position.y += player.size.width / 2;
                break;
        }
    }
}

export default Input;