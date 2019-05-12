import Canvas from './canvas';
// import Player from '../../bomberman/player';
import Grid from '../../bomberman/grid';
import { connect } from 'react-redux';


const msp = state => {
    // let canvas = document.getElementById("canvas");
    return ({
        grid: new Grid(canvas),
        // player: new Player(canvas),
        test: "test"
    });
}

const mdp = dispatch => ({
  
})

export default connect(msp, mdp)(Canvas);
