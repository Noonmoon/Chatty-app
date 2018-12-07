import React, {Component} from 'react';

class Nav extends Component {
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <h2 className="user-count">{this.props.userCount} user(s) online</h2>
        </nav>
      </div>
    );
  }
}

export default Nav;
