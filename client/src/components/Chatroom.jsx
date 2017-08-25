//require('.../client/dist/styles/styles.css');

import React from 'react';
import io from 'socket.io-client';
import Messages from './Messages.jsx';
import ChatInput from './ChatInput.jsx';

export default class Chatroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }

    this.handleSend = this.handleSend.bind(this);
  }

  componentDidMount() {
    makeClientSocketConnection();
  }

  makeClientSocketConnection() {
    //connect to server
    let socket = io.connect('http://localhost:3000');
    //listen for messages from server
    socket.on('server:message', (message) => {
    console.log(message);
    socket.emit('my other event', { my: 'data' });
  });
  }

  handleSend(message) {
    const messageObject = {
      // user:
      // message: ''

    }
    //emit message to server
    socket.emit('client:message', messageObject);
  }

  saveMessage() {
    //append message to state
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
    //save message to db

  }

  render() {
    return (
        <div className="container">
        <h3>Ferret Business Chat</h3>
        <Messages messages={this.state.messages} />
        <ChatInput onSend={this.handleSend} />
      </div>
    )

  }

};

