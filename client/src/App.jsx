const uuidv1 = require('uuid/v1');
import React, {Component} from 'react';
import ChatBar from './ChatBarComponent.jsx';
import MessageList from './MessageListComponent.jsx';

class App extends Component {
  constructor(props) {
    super(props)

    this.grabCurrentName = this.grabCurrentName.bind(this)
    this.addMessage = this.addMessage.bind(this)
    this.updateUser = this.updateUser.bind(this)

    this.state = {
      currentUser: {name: ''},
      newName: '',
      messages: [],
      userCount: {
        type: 'clientCount',
        count: 0
      }
    }
  }
  
  componentDidMount() {
    console.log('mounted')
    this.socket = new WebSocket("ws://localhost:3003");

    this.socket.onopen = () => {
      console.log(`Socket state: ${this.socket.readyState}`);
    }

    // on recieving message renders it
    this.socket.onmessage = (event) => {
      let message = JSON.parse(event.data)

      switch(message.type) {
        case "clientCount":
          this.setState({userCount: message});
          break;
        case "incomingMessage":
          this.setState(prevState => ({
            ...prevState,
            messages: [
              ...prevState.messages,
              message
            ]
          }));
          break;
        case "incomingNotification":
          this.setState(prevState => ({
            ...prevState,
            messages: [
              ...prevState.messages,
              message
            ]
          }));
          break;
        default:
          throw new Error("Unknown event type " + message.type);
      }
    }

  }

  updateUser() {
    this.setState({currentUser: {name: this.state.newName}});
  }

  grabCurrentName(e) {
    let newName = e.target.value;
    this.setState({newName});
  }

  addNotification() {
    const newNotification = {
      type: 'postNotification',
      id: uuidv1(),
      content: `${this.state.currentUser.name} has changed their name to ${this.state.newName}`
    }
    this.socket.send(JSON.stringify(newNotification));
    this.setState(prevState => ({
      ...prevState,
      messages: [
        ...prevState.messages,
        newNotification
      ]
    }));
  }

  addMessage(name, message) {
    if (name === '') {
      name = 'Anonymous'
    }
    if (this.state.currentUser.name !== '') {
      // no namechanged
      if (this.state.newName !== '') {
        // no namechanged
        if (name !== this.state.currentUser.name) {
          this.addNotification()
        }
      }
    }
    if (!message) {
      this.setState({ noMessage: true })
    } else {
      this.setState({ noMessage: false })
      const newMessage = {
        type: 'postMessage',
        id: uuidv1(),
        username: name,
        content: message
      }
      this.socket.send(JSON.stringify(newMessage))
      this.setState(prevState => ({
        ...prevState,
        messages: [
          ...prevState.messages,
          newMessage
        ]
      }));
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <h2 className="user-count">{this.state.userCount.count} user(s) online</h2>
        </nav>

        <MessageList messages={this.state.messages} />

        { this.state.noMessage && <div className="isa_error">
          Please enter in a message
        </div> }
        <ChatBar newName={this.state.newName} user={this.state.currentUser.name} updateUser={this.updateUser} grabCurrentName={this.grabCurrentName} addMessage={this.addMessage}/>
      </div>
    );
  }
}
export default App;
