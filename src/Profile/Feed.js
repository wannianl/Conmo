import React, { Component } from 'react';
import './Feed.css';
import TeacherCard from './TeacherCard';
import ParseHelper from '../helpers/ParseHelper';
import strings from '../localization/strings';

export default class Feed extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teachers: []
        }
    }

    componentDidMount() {
        ParseHelper.fetchTeacherList(this.props.category).then((allTeachers) => {
            this.setState({
                teachers: allTeachers
            });
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

    render() {

        let teacherList = this.state.teachers.map((teacher,index) => {
            return (
                <TeacherCard teacher={teacher} showUserProfile={this.props.showUserProfile} key={index} currentLanguage={this.props.currentLanguage} />
            );
        });

        return (
            <div className="Feed">
                <div className="topBtnHolder">
                    <button className="btn btn-default btn-sm topBtn" onClick={() => this.props.showFeed(null)}>{strings.back}</button>
                </div>
                <div className="row">
                    {teacherList.length > 0 ?
                    teacherList
                    :
                    <div className="emptyFeed">{strings.noActiveTeacher}</div>
                    }
                </div>
            </div>
        );
    }
}