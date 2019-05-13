import React from 'react';
import Grid from '../../bummerman/grid';
import Player from '../../bummerman/player';
import Input from '../../bummerman/input';

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
        this.grid = new Grid(this.state.canvas, ctx);
        this.grid.drawGrid();
        let coords = this.grid.gridToCanvas([1,3]);

        // this.grid.populateGrid();

        this.player = new Player(this.state.canvas, ctx);
        this.player.render();
        this.input = new Input(this.player);
    }

    render() {

        return (
            <canvas id='canvas' width={720} height={720}></canvas>
        )
    }

}

export default Canvas;