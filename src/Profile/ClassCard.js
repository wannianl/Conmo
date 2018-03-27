import React, { Component } from 'react';
import './ClassCard.css';
import avatarPlaceholder from '../assets/avatarPlaceholder.png';
import { Link } from 'react-router-dom';
import strings from '../localization/strings';

export default class ClassCard extends Component {

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

        let user = this.props.user;
        let name = user.get("name");
        let picture = user.get("avatar") ? user.get("avatar").url() : avatarPlaceholder;
        let userType = user.get("userType");
        let notificationID = this.props.notification.id;
        let courseName = "After effects crash course";
        let nextAppt = "Apr 6th, 2:00PM PST";

        return (
            <div className="ClassCard col-md-12 mt-4">
                <div className="row">
                    <div className="col-md-9">
                        <div className="infoContainer left">
                            <div className="course">{courseName}</div>
                            <div className="taught">Taught by</div>
                            <div className="name darkGreenText">{name}</div>
                            <div className="nextAppt">Next Appointment: {nextAppt}</div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="infoContainer right">
                            {this.props.classStatus === strings.requested && userType === 1 &&
                                <button className="btn generalBtn primaryBg" onClick={() => this.props.handleNotificationChange(this.props.notification.id, "accept")}>{strings.accept}</button>
                            }
                            {this.props.classStatus === strings.requested && userType === 2 &&
                                <button className="btn generalBtn defaultBtnBg unclickable">{strings.waiting}</button>
                            }
                            {this.props.classStatus === strings.accepted &&
                                <Link to={'/video/' + notificationID} target="_blank"><button className="btn generalBtn primaryBg">{strings.start}</button></Link>
                            }
                            <Link to={'/chat/' + notificationID} target="_blank"><button className="btn generalBtn primaryBg">{strings.message}</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}