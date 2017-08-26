import React from 'react';

export default class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatInput: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleSubmit(event) {
    //prevent page refresh on submit
    event.preventDefault();

    //clear input box
    this.setState({
      chatInput: ''
    })

    this.props.onSend(this.state.chatInput);
  }

  handleTextChange(event) {
    this.setState({
      chatInput: event.target.value
    })
  }

  render() {
    return (
      <form className="chat-input" onSubmit={this.handleSubmit}>
        <input type="text"
          onChange={this.handleTextChange}
          value={this.state.chatInput}
          placeholder="Write a message..."
          required />
      </form>
    )

  }

};