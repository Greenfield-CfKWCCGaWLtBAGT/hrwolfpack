import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header.jsx';
import Main from './Main.jsx';
import io from 'socket.io-client';


let env = window.location.hostname + ':' + window.location.port;
let socket = io(env);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      currentUser: ''
    };
  }

  componentDidMount() {
    let context = this;
    $.get('/user', (data) => {
      context.setState({
        userId: data.id,
        currentUser: data.username
    });
    console.log('APP USER: ', context.state.currentUser)
      });

  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Main userId={this.state.userId} username={this.state.currentUser} socket={socket}/>
      </div>
    );
  }
}

export default App;