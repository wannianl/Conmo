import React, { Component } from 'react';
import './TeacherCard.css';
import avatarPlaceholder from '../assets/avatarPlaceholder.png';

export default class TeacherCard extends Component {

    render() {

        let teacher = this.props.teacher;
        let picture = teacher.get('avatar') ? teacher.get('avatar').url() : avatarPlaceholder;
        let name = teacher.get('name');
        let statement = teacher.get('personalStatement');
        let rate = teacher.get('rate');

        return (
            <div className="TeacherCard col-sm-6 col-md-4 col-lg-3 mt-4" onClick={() => this.props.showUserProfile(teacher)}>
                <div className="card">
                    <img className="card-img-top" src={picture} />
                    <div className="card-block">
                        <h4 className="card-title">{name}</h4>
                        <div className="meta">
                            Teacher
                        </div>
                        <div className="card-text">
                            {statement}
                        </div>
                    </div>
                    <div className="card-footer">
                        <span className="float-right">${rate}/hour</span>
                        <span className="float-left">0 hours</span>
                    </div>
                </div>
            </div>
        );
    }
}