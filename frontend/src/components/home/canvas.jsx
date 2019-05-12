import React from 'react';

class Canvas extends React.Component {
    constructor(props) {
        super(props);
    }    

    render() {
        return (
            <canvas id='canvas' width={640} height={640}></canvas>
        )
    }
}

export default Canvas;