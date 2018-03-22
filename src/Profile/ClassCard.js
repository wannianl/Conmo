import React, { Component } from 'react';
import './ClassCard.css';
import avatarPlaceholder from '../assets/avatarPlaceholder.png';
import { Link } from 'react-router-dom';
import strings from '../localization/strings';

export default class ClassCard extends Component {

    render() {

        let user = this.props.user;
        let name = user.get("name");
        let picture = user.get("avatar") ? user.get("avatar").url() : avatarPlaceholder;
        let userType = user.get("userType");
        let notificationID = this.props.notification.id;

        return (
            <div className="ClassCard col-sm-6 col-md-4 col-lg-3 mt-4">
                <div className="card">
                    <img className="card-img-top" src={picture} alt="" />
                    <div className="card-block">
                        <h4 className="card-title">{name}</h4>
                    </div>
                    <div className="card-text">
                        {this.props.classStatus}
                    </div>
                    <div className="card-footer">
                        <Link to={'/chat/' + notificationID} target="_blank"><button className="btn btn-primary btn-sm float-right">{strings.message}</button></Link>
                        {this.props.classStatus === strings.requested && userType === 1 &&
                            <button className="btn btn-success btn-sm float-left" onClick={() => this.props.handleNotificationChange(this.props.notification.id, "accept")}>{strings.accept}</button>
                        }
                        {this.props.classStatus === strings.requested && userType === 2 &&
                            <button className="btn btn-default btn-sm float-left unclickable">{strings.waiting}</button>
                        }
                        {this.props.classStatus === strings.accepted &&
                            <Link to={'/video/' + notificationID} target="_blank"><button className="btn btn-primary btn-sm float-left">{strings.start}</button></Link>
                        }
                    </div>
                </div>
            </div>
        );
    }
}