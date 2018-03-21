import React, { Component } from 'react';
import './ChatApp.css';
import NameBox from './NameBox.js';
import Chat from 'twilio-chat';

class ChatApp extends Component {
  constructor(props) {
    super(props);
    const name = localStorage.getItem('name') || '';
    const loggedIn = name !== '';
    this.state = {
      name,
      loggedIn,
      token: '',
      chatReady: false,
      messages: [],
      newMessage: ''
    };
  }

  componentWillMount = () => {
    if (this.state.loggedIn) {
      this.getToken();
    }
  };

  onNameChanged = event => {
    this.setState({ name: event.target.value });
  };

  logIn = event => {
    event.preventDefault();
    if (this.state.name !== '') {
      localStorage.setItem('name', this.state.name);
      this.setState({ loggedIn: true }, this.getToken);
    }
  };

  logOut = event => {
    event.preventDefault();
    this.setState({
      name: '',
      loggedIn: false,
      token: '',
      chatReady: false,
      messages: [],
      newMessage: ''
    });
    localStorage.removeItem('name');
    this.chatClient.shutdown();
    this.channel = null;
  };

  getToken = () => {
    fetch(`/token-chat/${this.state.name}`, {
      method: 'POST'
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ token: data.token }, this.initChat);
      });
  };

  initChat = () => {
    this.chatClient = new Chat(this.state.token);
    this.chatClient.initialize().then(this.clientInitiated.bind(this));
  };

  clientInitiated = () => {
    this.setState({ chatReady: true }, () => {
      this.chatClient
        .getChannelByUniqueName('chat ' + this.props.notificationID)
        .then(channel => {
          if (channel) {
            return (this.channel = channel);
          }
        })
        .catch(err => {
          if(err.body.code === 50300){
            return this.chatClient.createChannel({
              uniqueName: 'chat ' + this.props.notificationID
            });
          }
        })
        .then(channel => {
          this.channel = channel;
          window.channel = channel;
          return this.channel.join();
        })
        .then(() => {
          this.channel.getMessages().then(this.messagesLoaded);
          this.channel.on('messageAdded', this.messageAdded);
        });
    });
  };

  messagesLoaded = messagePage => {
    this.setState({ messages: messagePage.items });
  };

  messageAdded = message => {
    this.setState((prevState, props) => ({
      messages: [...prevState.messages, message]
    }));
  };

  onMessageChanged = event => {
    this.setState({ newMessage: event.target.value });
  };

  sendMessage = event => {
    event.preventDefault();
    const message = this.state.newMessage;
    this.setState({ newMessage: '' });
    this.channel.sendMessage(message);
  };

  newMessageAdded = div => {
    if (div) {
      div.scrollIntoView();
    }
  };

  render() {

    
    var loginOrChat;
    const messages = this.state.messages.map(message => {
      return (
        <div className="Message" key={message.sid} ref={this.newMessageAdded}>
          <span className="author">{message.author}:</span>
          {message.body}
        </div>
      );
    });
    if (this.state.loggedIn) {
      loginOrChat = (
        <div className="ChatApp">
          <div className="MessageList">
            {messages}
          </div>
          <form className="MessageForm" onSubmit={this.sendMessage}>
            <div className="input-container">
              <input
              type="text"
              name="message"
              id="message"
              onChange={this.onMessageChanged}
              value={this.state.newMessage}
              />
            </div>
            <div className="button-container">
              <button>
              Send
              </button>
            </div>
          </form>
        </div>
      );
    } else {
      loginOrChat = (
        <div className="ChatApp">
          <NameBox
            name={this.state.name}
            onNameChanged={this.onNameChanged}
            logIn={this.logIn}
          />
        </div>
      );
    }
    return (
      <div>
        {loginOrChat}
      </div>
    );
  }
}

export default ChatApp;
