import React from 'react';
import './App.css';
import Greeting from './components/home/greeting';
import CanvasContainer from './components/home/canvas_container';

function App() {

  return (
    <div className='main-container'>
      <Greeting />
      <CanvasContainer/>
    </div>
  );
}

export default App;
