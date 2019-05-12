import React from 'react';
import Grid from '../../bomberman/grid';

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        
    }    

    componentDidUpdate() {
        debugger
        this.canvas = document.getElementById("canvas");
        const ctx = this.canvas.getContext('2d');
        this.grid = new Grid(this.canvas, ctx);
        this.grid.drawGrid();
    }

    render() {
        if (this.canvas === null) return null;
        return (
            <canvas id='canvas' width={720} height={720}></canvas>
        )
    }

}

export default Canvas;