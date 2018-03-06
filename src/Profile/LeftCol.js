import React, { Component } from 'react';
import './LeftCol.css';
import avatarPlaceholder from '../assets/avatarPlaceholder.png';

export default class LeftCol extends Component {
    
    render() {

        const currentUser = this.props.currentUser;
    
        let picture = currentUser.has("avatar") ? currentUser.get("avatar").url() : avatarPlaceholder;
        let name = currentUser.get("name");
        let userType = currentUser.get("userType") === 1 ? "Student" : "Teacher";
        //let email = currentUser.get("email");
        //let country = currentUser.get("country");
        //let city = currentUser.get("city");
        //let rate = currentUser.get("rate");
        //let statement = currentUser.get("statement");

        return (
            <div className="LeftCol col-md-3">
                <div className="profile-sidebar">
                    <div className="profile-userpic">
                        <img src={picture} className="img-responsive" alt=""/>
                    </div>
                    <div className="profile-usertitle">
                        <div className="profile-usertitle-name">
                            {name}
                        </div>
                        <div className="profile-usertitle-job">
                            {userType}
                        </div>
                    </div>
                    <div className="profile-usermenu">
                        <ul className="nav">
                            {userType === "Student" &&
                                <li className={this.props.currentPanel === 'feed' && userType==='Student' ? 'active' : null} onClick={() => this.props.handleUserMenu('feed')}>
                                    <i className="fas fa-home"></i>
                                    Feed
                                </li>
                            }
                            <li className={this.props.currentPanel === 'overview' ? 'active' : this.props.currentPanel === 'feed' && userType === 'Teacher' ? 'active' : null} onClick={() => this.props.handleUserMenu('overview')}>
                                 <i className="fas fa-user"></i>
                                Overview
                            </li>
                            <li className={this.props.currentPanel === 'messages' ? 'active' : null} onClick={() => this.props.handleUserMenu('messages')}>
                                <i className="fas fa-comments"></i>
                                Messages
                            </li>
                            <li className={this.props.currentPanel === 'classes' ? 'active' : null} onClick={() => this.props.handleUserMenu('classes')}>
                                <i className="fas fa-book"></i>
                                My Classes
                            </li>
                            <li className={this.props.currentPanel === 'settings' ? 'active' : null} onClick={() => this.props.handleUserMenu('settings')}>
                                <i className="fas fa-pencil-alt"></i>
                                Account Settings
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    
    }
}