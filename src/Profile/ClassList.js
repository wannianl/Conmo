import React, { Component } from 'react';
import './ClassList.css';
import ClassCard from './ClassCard';

export default class ClassList extends Component {


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
                classStatus = "requested";
            } else if (type === "accept") {
                classStatus = "accepted";
            }
            return (
                <ClassCard notification={notification} user={user} classStatus={classStatus} key={index}
                handleNotificationChange={this.props.handleNotificationChange} />
            );
        });

        return (
            <div className="ClassList">
                <div className="row">
                    {classList}
                </div>
            </div>
        );
    }
}