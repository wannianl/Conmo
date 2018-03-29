import React, { Component } from 'react';
import './RightCol.css';
import Feed from './Feed';
import EditUser from './EditUser';
import PublicProfile from './PublicProfile';
import ClassList from './ClassList';
import strings from '../localization/strings';

export default class RightCol extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            showingUser: null
        }
        this.showUserProfile = this.showUserProfile.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentPanel !== 'feed') {
            this.setState({
                showingUser: null
            });
        }

        if(nextProps.currentLanguage) {
            if(nextProps.currentLanguage === 'zh') {
                strings.setLanguage('zh');
            } else {
                strings.setLanguage('en');
            }
        }
    }

    showUserProfile(user) {
        this.setState({
            showingUser: user
        });
    }

    render() {

        const currentUser = this.props.currentUser;
        let country = currentUser.get("country");
        let city = currentUser.get("city");
        let rate = currentUser.get("rate");
        let statement = currentUser.get("personalStatement");
        let userType = currentUser.get('userType');
        let hasClasses;
        if (this.props.notificationsArray.length > 0) {
            hasClasses = true;
        } else {
            hasClasses = false;
        }


        return (
            <div className="RightCol col-md-9 col-xl-10 tertiaryBg">
                <div className="profile-content tertiaryBg">
                    {this.state.showingUser &&
                        <PublicProfile showUserProfile={this.showUserProfile} user={this.state.showingUser} currentUser={this.props.currentUser}
                        updateNotifications={this.props.updateNotifications} currentLanguage={this.props.currentLanguage} />
                    }
                    {this.props.currentPanel === 'feed' && userType === 1 && !this.state.showingUser &&
                        <Feed showUserProfile={this.showUserProfile} currentLanguage={this.props.currentLanguage} />
                    }
                    {this.props.currentPanel === 'feed' && currentUser.get("userType") === 2 && !this.state.showingUser &&
                        <div>
                            <div className="profileItem">
                                <div className="label">{strings.rate}:</div>
                                <div className="value">{rate}</div>
                            </div>
                            <div className="profileItem">
                                <div className="label">{strings.statement}:</div>
                                <div className="value">{statement}</div>
                            </div>
                            <div className="profileItem">
                                <div className="label">{strings.teachingHours}:</div>
                                <div className="value">{strings.noTeachingHours}</div>
                            </div>
                        </div>
                    }
                    {this.props.currentPanel === 'classes' && !this.state.showingUser && !hasClasses &&
                        <div>You don't have any classes yet</div>
                    }
                    {this.props.currentPanel === 'classes' && !this.state.showingUser && hasClasses &&
                        <ClassList notificationsArray={this.props.notificationsArray} currentUser={this.props.currentUser} 
                        handleNotificationChange={this.props.handleNotificationChange} currentLanguage={this.props.currentLanguage} />
                    }
                    {this.props.currentPanel === 'messages' && !this.state.showingUser &&
                        <div>You don't have any messages</div>
                    }
                    {this.props.currentPanel === 'settings' && !this.state.showingUser &&
                        <EditUser editUser={this.props.editUser} handleInfoChange={this.props.handleInfoChange} 
                        handleUserSave={this.props.handleUserSave} handleUserMenu={this.props.handleUserMenu} 
                        handlePictureInput={this.props.handlePictureInput} currentLanguage={this.props.currentLanguage} />
                    }
                </div>
            </div>
        );
    
    }
}