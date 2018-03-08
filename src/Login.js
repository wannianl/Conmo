import React, { Component } from 'react';
import './Login.css';
import Topbar from './general/Topbar';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {


  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null
    };
  }

  handleLoginInfoChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  login() {
    this.props.handleLogin(this.state.email,this.state.password);
  }

  render() {

    if (this.props.currentScreen === 'home') {
        return <Redirect push to="/" />;
    } else if (this.props.currentScreen === 'subscribe') {
        return <Redirect push to="/subscribe" />;
    } else if (this.props.currentScreen === 'profile') {
        return <Redirect push to="/profile" />;
    }

    return (
        <div className="Login defaultBg">
            <Topbar handlePageChange={this.props.handlePageChange} />
            <div className="loginBox whiteBg">
              <h2 className="form-signin-heading">Log In</h2>
              <input type="text" className="loginInput" name="email" placeholder="E-mail" value={this.state.email || ''} onChange={(e) => this.handleLoginInfoChange(e)} />
              <input type="password" className="loginInput" name="password" placeholder="Password" value={this.state.password || ''} onChange={(e) => this.handleLoginInfoChange(e)}/>      
              {this.props.loginError && 
                <div className="errorMsg">{this.props.loginError}</div>
              }
              <button className="btn btn-lg btn-primary float-left actionBtn" onClick={() => this.login()}>Login</button>  
            </div>      
        </div>
    );
  }
}