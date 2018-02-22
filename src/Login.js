import React, { Component } from 'react';
import './Login.css';

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

    return (
        <div className="Login">      
            <h2 className="form-signin-heading">Log In</h2>
            <input type="text" className="loginInput" name="email" placeholder="E-mail" value={this.state.email || ''} onChange={(e) => this.handleLoginInfoChange(e)} />
            <input type="password" className="loginInput" name="password" placeholder="Password" value={this.state.password || ''} onChange={(e) => this.handleLoginInfoChange(e)}/>      
            {this.props.loginError && 
              <div className="errorMsg">{this.props.loginError}</div>
            }
            <button className="btn btn-lg btn-primary btn-block loginBtn" onClick={() => this.login()}>Login</button>   
        </div>
    );
  }
}