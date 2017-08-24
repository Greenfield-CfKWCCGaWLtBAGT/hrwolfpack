import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { BrowserRouter} from 'react-router-dom';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import App from './components/App.jsx';
import io from 'socket.io-client';

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('app'));

export default App;
