import React, {Component} from 'react';
import Message from './MessageComponent.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        <Message message={this.props.messages}/>

        <div className="message system">
        </div>
      </main>
    )
  }
}

export default MessageList;
