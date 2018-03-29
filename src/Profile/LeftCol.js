import React, { Component } from 'react';
import './LeftCol.css';
import avatarPlaceholder from '../assets/avatarPlaceholder.png';
import strings from '../localization/strings';

export default class LeftCol extends Component {
    
    componentWillReceiveProps(nextProps) {
        if(nextProps.currentLanguage) {
            if(nextProps.currentLanguage === 'zh') {
                strings.setLanguage('zh');
            } else {
                strings.setLanguage('en');
            }
        }
    }

    render() {

        const currentUser = this.props.currentUser;
    
        let picture = currentUser.has("avatar") ? currentUser.get("avatar").url() : avatarPlaceholder;
        let name = currentUser.get("name");
        let userType = currentUser.get("userType") === 1 ? strings.student : strings.teacher;

        return (
            <div className="LeftCol col-md-3 secondaryBg">
                <div className="profile-sidebar">
                    <div className="profile-userpic">
                        <img src={picture} className="img-responsive" alt=""/>
                    </div>
                    <div className="profile-usertitle">
                        <div className="profile-usertitle-name whiteText">
                            {name}
                        </div>
                        <div className="profile-usertitle-job greenText">
                            {userType}
                        </div>
                    </div>
                    <div className="profile-usermenu">
                        <ul className="nav">
                            {userType === "Student" &&
                                <li className={this.props.currentPanel === 'feed' && userType==='Student' ? 'active' : null} onClick={() => this.props.handleUserMenu('feed')}>
                                    <i className="fas fa-home"></i>
                                    {strings.feed}
                                </li>
                            }
                            <li className={this.props.currentPanel === 'classes' ? 'active' : null} onClick={() => this.props.handleUserMenu('classes')}>
                                <i className="fas fa-book"></i>
                                {strings.courses}
                            </li>
                            <li className={this.props.currentPanel === 'settings' ? 'active' : null} onClick={() => this.props.handleUserMenu('settings')}>
                                <i className="fas fa-pencil-alt"></i>
                                {strings.account}
                            </li>
                            <li className={this.props.currentPanel === 'messages' ? 'active' : null} onClick={() => this.props.handleUserMenu('messages')}>
                                <i className="fas fa-comments"></i>
                                {strings.messages}
                            </li>
                            <li onClick={() => this.props.handleLogout()}>
                                <i className="fas fa-sign-out-alt"></i>
                                {strings.logout}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    
    }
}