import React, { Component } from 'react';
import './SignIn.css';
import { Redirect } from 'react-router-dom';
import strings from './localization/strings';

export default class SignIn extends Component {


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

    if (this.props.currentScreen === 'signup') {
        return <Redirect push to="/signup" />;
    } else if (this.props.currentScreen === 'profile') {
        return <Redirect push to="/profile" />;
    }

    return (
        <div className="SignIn whiteBg">
            <div className="loginBox whiteBg">
              <h1 className="grayText">Conmo</h1> 
              <div className="innerContainer">
                <input type="text" className="defaultInput loginInput" name="email" placeholder={strings.email} value={this.state.email || ''} onChange={(e) => this.handleLoginInfoChange(e)} />
                <input type="password" className="defaultInput loginInput" name="password" placeholder={strings.password} value={this.state.password || ''} onChange={(e) => this.handleLoginInfoChange(e)}/>      
                {this.props.loginError && 
                  <div className="errorMsg">{this.props.loginError}</div>
                }
                <button className="btn actionBtn confirmBtn" onClick={() => this.login()}>{strings.signIn}</button>  
              </div>
            </div>
            <div className="textBtn" onClick={() => this.props.handlePageChange("signup")}><i className="fas fa-user"></i>{strings.signUp}</div>
        </div>
    );
  }
}