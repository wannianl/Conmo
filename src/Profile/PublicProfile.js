import React, { Component } from 'react';
import './PublicProfile.css';
import avatarPlaceholder from '../assets/avatarPlaceholder.png';
import coverPlaceholder from '../assets/coverPlaceholder.jpg';

export default class PublicProfile extends Component {

    render() {

        let user = this.props.user;
        let avatar = user.has("avatar") ? user.get("avatar").url() : avatarPlaceholder;
        let cover = user.has("wallpaper") ? user.get("wallpaper").url() : coverPlaceholder;
        let name = user.get("name");
        let type = user.get("userType") === 1 ? "Student" : "Teacher";
        let statement = user.get("personalStatement");
        let rate = user.get("rate");

        return (
            <div className="PublicProfile">
                <div className="topBtnHolder">
                    <button className="btn btn-default btn-sm topBtn" onClick={() => this.props.showUserProfile(null)}>Back</button>
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
                                        <img className="img-responsive" src={avatar} alt="profile picture"/>
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
                                                <div className="profile-stats-desc">Hourly Rate</div>
                                            </div>
                                            <div className="statsGroup ml-5 text-center">
                                                <div className="profile-stats-info">0</div>
                                                <div className="profile-stats-desc">Students</div>
                                            </div>
                                            <div className="statsGroup ml-5 text-center">
                                                <div className="profile-stats-info">0</div>
                                                <div className="profile-stats-desc">Class Hours</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="profile-userbuttons float-left">
                                        <button className="btn btn-success btn-sm">Request</button>
                                        <button className="btn btn-primary btn-sm">Message</button>
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