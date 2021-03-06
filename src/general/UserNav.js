import React, { Component } from 'react';
import './UserNav.css';
import avatarPlaceholder from '../assets/avatarPlaceholder.png';

export default class UserNav extends Component {
    render() {

        const currentUser = this.props.currentUser;
        let picture = currentUser.has("avatar") ? currentUser.get("avatar").url() : avatarPlaceholder;
        let name = currentUser.get("name");

        return (
            <div className="UserNav primaryBg whiteText">
                <div className="homeBtn" onClick={() => this.props.handlePageChange("profile")}>
                    <img src={picture} alt="" />
                    <div className="name">{name}</div>
                </div>
                <div className="languageBtns whiteText">
                    <div className={this.props.currentLanguage === 'en' ? "language active" : "language"} onClick={() => this.props.handleLanguageSelection('en')}>En</div>
                    <div className="other">/</div>
                    <div className={this.props.currentLanguage === 'zh' ? "language active" : "language"} onClick={() => this.props.handleLanguageSelection('zh')}>中文</div>
                </div>
                <div className="notificationBtn" onClick={() => this.props.showNotificationBox()}>
                    <i className="fas fa-bell"></i>
                </div>
            </div>
        );
    }
}