import React, {Component} from 'react';
import ChatBar from './ChatBarComponent.jsx';
import MessageList from './MessageListComponent.jsx';
import RNG from '../generateRNG.js';

class App extends Component {
  constructor(props) {
    super(props)

    this.updateUser = this.updateUser.bind(this)
    this.addMessage = this.addMessage.bind(this)

    this.state = {
      currentUser: {name: 'Bob'},
      messages: [
        {
          type: 'incomingMessage',
          id: RNG(),
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
        },
        {
          type: 'incomingMessage',
          id: RNG(),
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ]
    }
  }

  updateUser(e) {
    let userName = e.target.value;
    this.setState({ currentUser: {name: userName}})
  }

  addMessage(name, message) {
    if (name === '') {
      name = 'Anonymous'
    }
    const newMessage = {
      type: 'incomingMessage',
      id: RNG(),
      username: name,
      content: message
    }
    const oldState = this.state.messages;
    const newState = [...oldState, newMessage];
    this.setState({ messages: newState });
  }

  componentDidMount() {


  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    const newMessage = {id: RNG(), username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})
  }, 3000);
}


  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>

        <MessageList messages={this.state.messages} />

        <ChatBar user={this.state.currentUser.name} updateUser={this.updateUser} addMessage={this.addMessage}/>
      </div>
    );
  }
}
export default App;
