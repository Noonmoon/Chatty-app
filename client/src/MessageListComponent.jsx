import React, {Component} from 'react';
import Message from './MessageComponent.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        {this.props.messages.map (message =>
          <Message key={message.id} message={message}/>
        )}
      </main>
    )
  }
}

export default MessageList;
