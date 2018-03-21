import React, { Component } from 'react';
import './Home.css';
import { Redirect } from 'react-router-dom';

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
        <div className="Home defaultBg"> 
            <h1>Conmo</h1>
            <div className="centeredBox small">
                <div>You must Log in or subscribe</div>
                <button className="btn btn-default actionBtn" onClick={() => this.props.handlePageChange("login")}>Login</button>
                <button className="btn btn-primary actionBtn ml-2" onClick={() => this.props.handlePageChange("subscribe")}>Subscribe</button>
            </div>
        </div>
    );
  }
}