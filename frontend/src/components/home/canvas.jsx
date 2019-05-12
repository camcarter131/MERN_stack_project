import React from 'react';

class Canvas extends React.Component {
    constructor(props) {
        super(props);
    }    

    render() {
        return (
            <canvas id='canvas' width={720} height={720}></canvas>
        )
    }
}

export default Canvas;