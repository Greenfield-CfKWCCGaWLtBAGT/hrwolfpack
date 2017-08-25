import React from 'react';
import io from 'socket.io-client';

export default class Chatroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    makeClientSocketConnection();
  }

  makeClientSocketConnection() {
    let socket = io.connect('http://localhost:3000');
    socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });
  }

  render() {
    return (
      <div>HELLO TING</div>
    )

  }

};

