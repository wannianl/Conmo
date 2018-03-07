import React, { Component } from 'react';
import './ClassCard.css';
import avatarPlaceholder from '../assets/avatarPlaceholder.png';

export default class ClassCard extends Component {

    render() {

        let user = this.props.user;
        let name = user.get("name");
        let picture = user.get("avatar") ? user.get("avatar").url() : avatarPlaceholder;
        let userType = user.get("userType");

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
                        <button className="btn btn-primary btn-sm float-right">Message</button>
                        {this.props.classStatus === "requested" && userType === 1 &&
                            <button className="btn btn-success btn-sm float-right" onClick={() => this.props.handleNotificationChange(this.props.notification.id, "accept")}>Accept</button>
                        }
                        {this.props.classStatus === "requested" && userType === 2 &&
                            <button className="btn btn-default btn-sm float-right unclickable">Waiting</button>
                        }
                        {this.props.classStatus === "accepted" &&
                            <button className="btn btn-default btn-sm float-right unclickable">Accepted</button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}