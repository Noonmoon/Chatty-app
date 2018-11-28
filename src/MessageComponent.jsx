import React, { Component } from 'react';

class Message extends Component {
  render() {
    const messages = this.props.message.map(message => (
      <div className="message" key={message.id}>
        <span className="message-username" key={message.id}>{message.username}</span>
        <span className="message-content">{message.content}</span>
      </div>
    ));

    return (
      <div>
        {messages}
      </div>
    )
  }
}

export default Message;
