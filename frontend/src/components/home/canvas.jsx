import React from 'react';
import Grid from '../../bomberman/grid';

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
    }

    render() {
        // if (this.canvas === null) return null;
        return (
            <canvas id='canvas' width={720} height={720}></canvas>
        )
    }

}

export default Canvas;