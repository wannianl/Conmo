import React, { Component } from 'react';
import './Home.css';
import { Redirect } from 'react-router-dom';
import strings from './localization/strings';

export default class Home extends Component {

  render() {

    if (this.props.currentScreen === 'login') {
        return <Redirect push to="/login" />;
    } else if (this.props.currentScreen === 'subscribe') {
        return <Redirect push to="/subscribe" />;
    } else if (this.props.currentScreen === 'profile') {
        return <Redirect push to="/profile" />;
    } else if (this.props.currentScreen === 'video') {
        return <Redirect push to="/video" />;
    }

    return (
        <div className="Home whiteBg"> 
            <h1 className="primaryBg whiteText">Conmo</h1>
            <div className="centeredBox small">
                <button className="btn btn-default actionBtn" onClick={() => this.props.handlePageChange("login")}>{strings.signIn}</button>
                <button className="btn btn-primary actionBtn ml-2" onClick={() => this.props.handlePageChange("subscribe")}>{strings.signUp}</button>
            </div>
        </div>
    );
  }
}