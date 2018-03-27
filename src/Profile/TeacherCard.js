import React, { Component } from 'react';
import './TeacherCard.css';
import avatarPlaceholder from '../assets/avatarPlaceholder.png';
import strings from '../localization/strings';

export default class TeacherCard extends Component {

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

        let teacher = this.props.teacher;
        let picture = teacher.get('avatar') ? teacher.get('avatar').url() : avatarPlaceholder;
        let name = teacher.get('name');
        let statement = teacher.get('personalStatement');
        let rate = teacher.get('rate');
        

        return (
            <div className="TeacherCard col-md-12" onClick={() => this.props.showUserProfile(teacher)}>
                <div className="row">
                    <div className="col-md-9">
                        <div className="infoContainer left">
                            <img src={picture} alt="" />
                        </div>
                        <div className="infoContainer right">
                            <div className="name">{name}</div>
                            <div className="statement">{statement}</div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="infoContainer">
                            <span className="rate float-right">${rate}/{strings.hour}</span>
                            <span className="hours float-left">0 {strings.hours}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}