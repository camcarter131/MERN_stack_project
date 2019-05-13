import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './root';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/store';
import io from 'socket.io-client';

ReactDOM.render(<Root store={configureStore()}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

const prod = process.env.REACT_APP_PROD;

// const socket = prod ? io() : io('http://localhost:5000');
const socket = io('http://localhost:5000');

socket.on('news', function (data) {
    console.log(data);
});
