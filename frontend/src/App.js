import React from 'react';
import './App.css';
import Greeting from './components/home/greeting';
import Canvas from './components/home/canvas';



function App() {

  return (
    <div className='main-container'>
      <Greeting />
      <Canvas canvas={document.getElementById('canvas')}/>
    </div>
  );
}

export default App;
