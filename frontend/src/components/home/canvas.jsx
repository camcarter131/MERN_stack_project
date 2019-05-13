import React from 'react';
import Game from '../../bummerman/game';

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {canvas: null};
        
    }    
    componentDidMount() {
        if (this.state.canvas === null) this.setState({canvas: document.getElementById("canvas")});
    }
    componentDidUpdate() {
        const ctx = this.state.canvas.getContext('2d');
        this.game = new Game(this.state.canvas, ctx);
    }

    render() {

        return (
            <canvas id='canvas' width={720} height={720}></canvas>
        )
    }

}

export default Canvas;