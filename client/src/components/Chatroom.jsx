//require('.../client/dist/styles/styles.css');

import React from 'react';
import Messages from './Messages.jsx';
import ChatInput from './ChatInput.jsx';
import axios from 'axios';
import {Panel} from 'react-bootstrap';


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
        console.log('CHATROOM DATA: ', messages.data)
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
        <Panel header={<h3>Buyer Chat</h3>} bsStyle="primary">
        <Messages messages={this.state.messages} />
        <ChatInput onSend={this.handleSend} />
        </Panel>
    )
  }

};

