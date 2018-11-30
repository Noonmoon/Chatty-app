import React, { Component } from 'react';

class Message extends Component {
  render() {
      const message = this.props.message
      if (message.type === 'incomingMessage' || message.type === 'postMessage') {
        return ( <div className="message">
          <span className="message-username">{message.username}</span>
          <span className="message-content">{message.content}</span>
        </div> )
      }
        return (
          <div className="message system">
          <div className="notification">
            <span className="notification-content">{message.content}</span>
          </div>
        </div>
      )
  }
}

export default Message;
