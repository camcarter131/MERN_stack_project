import io from 'socket.io-client';
import * as serviceWorker from './serviceWorker';

const socket = io('http://localhost:3000');

serviceWorker.unregister();