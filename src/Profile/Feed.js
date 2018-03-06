import React, { Component } from 'react';
import './Feed.css';
import TeacherCard from './TeacherCard';
import ParseHelper from '../helpers/ParseHelper';

export default class Feed extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teachers: []
        }
    }

    componentDidMount() {
        ParseHelper.fetchTeacherList().then((allTeachers) => {
            this.setState({
                teachers: allTeachers
            });
        });
    }

    render() {

        let teacherList = this.state.teachers.map((teacher,index) => {
            return (
                <TeacherCard teacher={teacher} showUserProfile={this.props.showUserProfile} key={index} />
            );
        });

        return (
            <div className="Feed">
                <div className="row">
                    {teacherList}
                </div>
            </div>
        );
    }
}