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
    }

    return (
        <div className="Home"> 
            <div className="centeredBox small">
                <div className="mb-3">You must Log in or subscribe</div>
                <button className="btn btn-default" onClick={() => this.props.handlePageChange("login")}>Log In</button>
                <button className="btn btn-primary ml-2" onClick={() => this.props.handlePageChange("subscribe")}>Subscribe</button>
            </div>
        </div>
    );
  }
}