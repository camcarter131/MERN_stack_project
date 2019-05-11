import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const store = configureStore();

    ReactDOM.render(<p>Hello</p>, canvas);
});