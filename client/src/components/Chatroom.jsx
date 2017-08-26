//require('.../client/dist/styles/styles.css');

import React from 'react';
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
    this.props.socket.on('serverMessage', (data) => {
      this.setState({
        messages: this.state.messages.concat(data)
      })
    });
  }

  handleSend(message) {
    const messageObject = {
      user: this.props.userId,
      message: message

    }
    //emit message to server
    this.props.socket.emit('clientMessage', messageObject);
  }

  // saveMessage() {
  //   //append message to state
  //   const messages = this.state.messages;
  //   messages.push(message);
  //   this.setState({ messages });
  //   //save message to db
  // }

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

