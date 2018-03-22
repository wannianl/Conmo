import React, { Component } from 'react';
import './index.css';
import { Redirect } from 'react-router-dom';
import UserNav from '../general/UserNav';
import LeftCol from './LeftCol';
import RightCol from './RightCol';
import NotificationBox from '../general/NotificationBox';

export default class Profile extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            currentPanel: 'feed',
            showNotificationBox: false,
        }
        this.handleUserMenu = this.handleUserMenu.bind(this);
        this.showNotificationBox = this.showNotificationBox.bind(this);
    }


    handleUserMenu(target) {
        if (target === 'settings') {
            this.props.handleSettingsAccess();
        }

        this.setState({
            currentPanel: target
        });
    }

    showNotificationBox() {
        this.setState({
            showNotificationBox: !this.state.showNotificationBox
        });
    }

    render() {

        if (this.props.currentScreen === 'signin') {
            return <Redirect push to="/signin" />;
        } else if (this.props.currentScreen === 'signup') {
            return <Redirect push to="/signup" />;
        } else if (this.props.currentScreen === 'home' || !this.props.currentUser) {
            return <Redirect push to="/" />;
        }

        return (
            <div className="Profile">
                <UserNav handlePageChange={this.props.handlePageChange} currentUser={this.props.currentUser}
                showNotificationBox={this.showNotificationBox} />
                <div className="row contentContainer">
                    <LeftCol currentUser={this.props.currentUser} currentPanel={this.state.currentPanel} handleUserMenu={this.handleUserMenu} handleLogout={this.props.handleLogout} />
                    <RightCol currentUser={this.props.currentUser} currentPanel={this.state.currentPanel} editUser={this.props.editUser}
                    handleInfoChange={this.props.handleInfoChange} handleUserSave={this.props.handleUserSave} handleUserMenu={this.handleUserMenu}
                    notificationsArray={this.props.notificationsArray} handleNotificationChange={this.props.handleNotificationChange}
                    updateNotifications={this.props.updateNotifications} handlePictureInput={this.props.handlePictureInput} />
                </div>
                {this.state.showNotificationBox && 
                    <NotificationBox currentUser={this.props.currentUser} notificationsArray={this.props.notificationsArray} handleUserMenu={this.handleUserMenu} showNotificationBox={this.showNotificationBox} />
                }
            </div>
        );
    
    }
}