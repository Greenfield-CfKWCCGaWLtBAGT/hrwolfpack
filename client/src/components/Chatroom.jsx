//require('.../client/dist/styles/styles.css');

import React from 'react';
import Messages from './Messages.jsx';
import ChatInput from './ChatInput.jsx';
import axios from 'axios';


export default class Chatroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }

    this.handleSend = this.handleSend.bind(this);
  }

  componentWillMount() {
    //curent messages for current listing page
    axios.get('/messages', {
      params: {
        listingId: this.props.listingId
      }
    })
      .then((messages) => {
        this.setState({
          messages: messages.data
        })
      })
      .catch((err) => {
        console.log('Error: ', err);
      })
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
      username: this.props.username,
      message: message,
      listingInfo: this.props.listingInfo,
      listingId: this.props.listingId
    }

    //emit message to server
    this.props.socket.emit('clientMessage', messageObject);
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

