import React, { Component } from 'react';
import './PublicProfile.css';
import avatarPlaceholder from '../assets/avatarPlaceholder.png';
import coverPlaceholder from '../assets/coverPlaceholder.jpg';
import ParseHelper from '../helpers/ParseHelper';
import strings from '../localization/strings';

export default class PublicProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            friendship: null
        }
    }

    componentDidMount() {
        ParseHelper.fetchUserNotifications(this.props.currentUser.id,this.props.currentUser.get("userType")).then((allNotifs) => {
            let alreadyFriends = allNotifs.filter((notif) => {
                if (notif.get("teacher").id === this.props.user.id) {
                    return true;
                }
                return false;
            });
            if (alreadyFriends.length > 0) {
                this.setState({
                    friendship: alreadyFriends[0].get("type")
                });
            } else {
                this.setState({
                    friendship: null
                });
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.currentLanguage) {
            if(nextProps.currentLanguage === 'zh') {
                strings.setLanguage('zh');
            } else {
                strings.setLanguage('en');
            }
        }
    }

    handleRequest() {
        var notifPromise = ParseHelper.sendRequestNotification(this.props.user,this.props.currentUser);
        var friendshipPromise = ParseHelper.fetchUserNotifications(this.props.currentUser.id,this.props.currentUser.get("userType"));
        Promise.all([friendshipPromise,notifPromise]).then((values) => {
            let alreadyFriends = values[0].filter((notif) => {
                if (notif.get("teacher").id === this.props.user.id) {
                    return true;
                }
                return false;
            });
            if (alreadyFriends.length > 0) {
                this.setState({
                    friendship: alreadyFriends[0].get("type")
                });
            } else {
                this.setState({
                    friendship: null
                });
            }
        }).then(() => {
            this.props.updateNotifications();
        });
    }

    render() {

        let user = this.props.user;
        let avatar = user.has("avatar") ? user.get("avatar").url() : avatarPlaceholder;
        let cover = user.has("wallpaper") ? user.get("wallpaper").url() : coverPlaceholder;
        let name = user.get("name");
        //let type = user.get("userType") === 1 ? "Student" : "Teacher";
        let statement = user.get("personalStatement");
        let rate = user.get("rate");

        return (
            <div className="PublicProfile">
                <div className="topBtnHolder">
                    <button className="btn btn-default btn-sm topBtn" onClick={() => this.props.showUserProfile(null)}>{strings.back}</button>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-12">
                        <div className="panel panel-default plain profile-panel">
                            <div className="panel-heading white-content p-left p-right">
                                <img className="profile-image" src={cover} alt="profile cover"/>
                            </div>
                            <div className="panel-body">
                                <div className="col-xs-4 col-md-4 avatarCol">
                                    <div className="profile-avatar">
                                        <img className="img-responsive" src={avatar} alt=""/>
                                    </div>
                                </div>
                                <div className="col-xs-8 col-md-8 infoCol">
                                    <div className="user-name">
                                        {name}
                                    </div>
                                    <div className="user-information">
                                        <div>{statement}</div>
                                        <div className="statsHolder mt-2 mb-2">
                                            <div className="statsGroup text-center">
                                                <div className="profile-stats-info">${rate}.00</div>
                                                <div className="profile-stats-desc">{strings.hourlyRate}</div>
                                            </div>
                                            <div className="statsGroup ml-5 text-center">
                                                <div className="profile-stats-info">0</div>
                                                <div className="profile-stats-desc">{strings.students}</div>
                                            </div>
                                            <div className="statsGroup ml-5 text-center">
                                                <div className="profile-stats-info">0</div>
                                                <div className="profile-stats-desc">{strings.classHours}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="profile-userbuttons float-left">
                                        {!this.state.friendship &&
                                            <button className="btn btn-success btn-sm" onClick={() => this.handleRequest()}>{strings.request}</button>
                                        }
                                        {this.state.friendship &&
                                            <button className="btn btn-default btn-sm unclickable">{this.state.friendship}ed</button>
                                        }
                                        <button className="btn btn-primary btn-sm">{strings.message}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}