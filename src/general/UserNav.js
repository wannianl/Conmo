import React, { Component } from 'react';
import './UserNav.css';
import avatarPlaceholder from '../assets/avatarPlaceholder.png';

export default class UserNav extends Component {
    render() {

        const currentUser = this.props.currentUser;
        let picture = currentUser.has("avatar") ? currentUser.get("avatar").url() : avatarPlaceholder;
        let name = currentUser.get("name");

        return (
            <div className="UserNav">
                <div className="homeBtn" onClick={() => this.props.handlePageChange("profile")}>
                    <img src={picture} alt="" />
                    <div className="name">{name}</div>
                </div>
                <div className="notificationBtn" onClick={() => this.props.showNotificationBox()}>
                    <i className="fas fa-bell"></i>
                </div>
                <div className="btn btn-danger logoutBtn" onClick={() => this.props.handleLogout()}>Logout</div>
            </div>
        );
    }
}