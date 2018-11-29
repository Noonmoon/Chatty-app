import React, { Component } from 'react';


class ChatBar extends Component {
  onKeyPress = event => {
    if (event.key == 'Enter'){
      const user = this.props.user;
      let inputMessage = event.target;
      this.props.addMessage(user, inputMessage.value);
      inputMessage.value = '';
    }
  }
  render() {
    return (
      <div>
        <footer className="chatbar">
          <input className="chatbar-username" name='user' placeholder='Enter name (optional)' onChange={this.props.updateUser} defaultValue={this.props.user}/>
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.onKeyPress}/>
        </footer>
      </div>
    )
  }
}
export default ChatBar;
