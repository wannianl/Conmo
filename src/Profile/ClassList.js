import React, { Component } from 'react';
import './ClassList.css';
import ClassCard from './ClassCard';
import strings from '../localization/strings';

export default class ClassList extends Component {

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

        let currentUser = this.props.currentUser;
        let userType = currentUser.get("userType");

        let classList = this.props.notificationsArray.map((notification,index) => {
            let user;
            if (userType === 1) {
                user = notification.get("teacher");
            } else if (userType === 2) {
                user = notification.get("student");
            }
            let type = notification.get("type");
            let classStatus;
            if (type === "request") {
                classStatus = strings.requested;
            } else if (type === "accept") {
                classStatus = strings.accepted;
            }
            return (
                <ClassCard notification={notification} user={user} classStatus={classStatus} key={index}
                handleNotificationChange={this.props.handleNotificationChange} currentLanguage={this.props.currentLanguage} />
            );
        });

        return (
            <div className="ClassList tertiaryBg">
                <div className="row">
                    {classList}
                </div>
            </div>
        );
    }
}