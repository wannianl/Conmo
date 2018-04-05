import React, { Component } from 'react';
import './Home.css';
import { Redirect } from 'react-router-dom';
import strings from './localization/strings';

export default class Home extends Component {

  render() {

    if (this.props.currentScreen === 'signin') {
        return <Redirect push to="/signin" />;
    } else if (this.props.currentScreen === 'signup') {
        return <Redirect push to="/signup" />;
    } else if (this.props.currentScreen === 'signup') {
        return <Redirect push to="/signup" />;
    } else if (this.props.currentScreen === 'video') {
        return <Redirect push to="/video" />;
    } else if (this.props.currentScreen === 'profile') {
        return <Redirect push to="/profile" />;
    }

    return (
        <div className="Home tertiaryBg"> 
            <div className="homeBox">
                <h1 className="grayText">Conmo</h1> 
                <button className="btn actionBtn confirmBtn" onClick={() => this.props.handlePageChange("signin")}>{strings.homeSentence}</button>  
            </div>
        </div>
    );
  }
}