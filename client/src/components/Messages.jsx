import React from 'react';
import Message from './Message.jsx';

export default class Messages extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const messages = this.props.messages.map((message, index) => {
        return (
          <Message
            key={index}
            user={message.user}
            username={message.username}
            message={message.message}
          />
        );
      });

    return (
      <div className='messages' id='messageList'>
        { messages }
      </div>
    );
  }
}
