import React from 'react';

export default class Message extends React.Component {
  render() {

    return (
      <div>
        <strong>{ this.props.username }</strong>: { this.props.message }
      </div>
    );
  }
};
