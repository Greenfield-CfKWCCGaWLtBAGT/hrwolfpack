import React from 'react';

export default class Message extends React.Component {
  render() {

    return (
      <div>
        <div className='username'>
          { this.props.user }
        </div>
        <div className='message-body'>
          { this.props.message }
        </div>
      </div>
    );
  }
};
