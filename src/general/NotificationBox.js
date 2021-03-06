import React, { Component } from 'react';
import './NotificationBox.css';
import avatarPlaceholder from '../assets/avatarPlaceholder.png';
import strings from '../localization/strings';

export default class NotificationBox extends Component {
    
    componentWillReceiveProps(nextProps) {
        if(nextProps.currentLanguage) {
            if(nextProps.currentLanguage === 'zh') {
                strings.setLanguage('zh');
            } else {
                strings.setLanguage('en');
            }
        }
    }

    handleNotificationClick() {
        this.props.handleUserMenu("classes");
        this.props.showNotificationBox();
    }

    render() {

        var currentUser = this.props.currentUser;
        var userType = currentUser.get("userType");
        let list;

        if (userType === 1) {
            var filteredArray = this.props.notificationsArray.filter((notif) => {
                if (notif.get("type") !== "request") {
                    return true;
                }
                return false;
            });
            list = filteredArray.map((notification) => {
                let teacher = notification.get("teacher");
                let picture = teacher.has("avatar") ? teacher.get("avatar").url() : avatarPlaceholder;
                let name = teacher.get("name");
                let type = notification.get("type");
                let text;
                if (type === "accept") {
                    text = name + " " + strings.acceptedNotif;
                }
                return (
                    <div key={notification.id} className='notificationListCont' onClick={() => this.handleNotificationClick()}>
                        <div className="avatarCont">
                            <img className="listAvatar" src={picture} alt="" />
                        </div>
                        <div className="listText">{text}</div>
                    </div>
                );
            });
            

        } else if (userType === 2) {
            list = this.props.notificationsArray.map((notification) => {

                let student = notification.get("student");
                let picture = student.has("avatar") ? student.get("avatar").url() : avatarPlaceholder;
                let name = student.get("name");
                let type = notification.get("type");
                let text;
                if (type === "request") {
                    text = name + " " + strings.requestedNotif;
                } else if (type === "accept") {
                    text = strings.connectedNotifPartOne + " " + name + " " + strings.connectedNotifPartTwo;
                }
                return (
                    <div key={notification.id} className='notificationListCont' onClick={() => this.handleNotificationClick()}>
                        <div className="avatarCont">
                            <img className="listAvatar" src={picture} alt="" />
                        </div>
                        <div className="listText">{text}</div>
                    </div>
                );
            });
        }        

        return (
            <div className="NotificationBox">
                {list.length > 0 ?
                list
                :
                <div>{strings.noNotif}</div>
                }
            </div>
        );
    }

}