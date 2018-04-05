import React, { Component } from 'react';
import './FeedNew.css';
import ParseHelper from '../helpers/ParseHelper';
import strings from '../localization/strings';

export default class FeedNew extends Component {

    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            categories: [],
            activeTab: null,
            test: []
        }
    }

    componentDidMount() {


        ParseHelper.fetchCategories().then((allCategories) => {
            var groups = [];
            allCategories.forEach((category) => {
                groups.push(category.get("Group"));
            });
            var groupsFiltered = groups.filter((v, i, a) => a.indexOf(v) === i);
            var activeTab = groupsFiltered[0];
            var categories = allCategories.filter((category) => {
                if (category.get("Group") === activeTab) {
                    return category;
                }
                return false;
            });

            var promises = categories.map((category) => {
                return ParseHelper.fetchTeacherList(category).then((teachers) => {
                    let image = category.has('image') ? category.get('image').url() : 'https://st2.depositphotos.com/3256961/6456/v/950/depositphotos_64564991-stock-illustration-the-teacher-teaching-his-students.jpg';
                    let obj = {
                        name: category.get("Category"),
                        description: category.get("description"),
                        image: image,
                        teacherCount: teachers.length,
                        id: category.id
                    }
                    return obj;
                });
            });

            Promise.all(promises).then((results) => {
                this.setState({
                    groups: groupsFiltered,
                    activeTab: activeTab,
                    categories: results
                });
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

    handleTabClick(tab) {
        ParseHelper.fetchCategories().then((allCategories) => {
            var categories = allCategories.filter((category) => {
                if (category.get("Group") === tab) {
                    return category;
                }
                return false;
            });

            var promises = categories.map((category) => {
                return ParseHelper.fetchTeacherList(category).then((teachers) => {
                    let image = category.has('image') ? category.get('image').url() : 'https://st2.depositphotos.com/3256961/6456/v/950/depositphotos_64564991-stock-illustration-the-teacher-teaching-his-students.jpg';
                    let obj = {
                        name: category.get("Category"),
                        description: category.get("description"),
                        image: image,
                        teacherCount: teachers.length,
                        id: category.id
                    }
                    return obj;
                });
            });

            Promise.all(promises).then((results) => {
                this.setState({

                    activeTab: tab,
                    categories: results
                });
            });

        });
    }


    render() {

        var tabs = this.state.groups.map((tab) => {
            return (
                    <div className="col-xs-4 col-md-2 no-spacing">
                        <li className={this.state.activeTab === tab ? "panel-tab active" : "panel-tab"} onClick={() => this.handleTabClick(tab)}>
                            {tab}
                        </li>
                    </div>
            )
        });
        
        var panels = this.state.groups.map((panel) => {
            if (panel === this.state.activeTab) {
                var categories = this.state.categories.map((category) => {
                    let name = category.name;
                    let description = category.description;
                    let image = category.image;
                    let count = category.teacherCount;
                    let id = category.id;
                    return (
                        <div className="CategoryCard col-md-12" onClick={() => this.props.showFeed(id)}>
                            <div className="row">
                                <div className="col-md-9">
                                    <div className="infoContainer left">
                                        <img src={image} alt="" />
                                    </div>
                                    <div className="infoContainer right">
                                        <div className="name">{name}</div>
                                        <div className="statement">{description}</div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="infoContainer count">
                                        <div className="text">{count} {strings.activeTeachers}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })

                 return (
                    <section className="card">
                        <div className="card-body">{categories}</div>
                    </section>
                );
            } 
        })

        return (
            <div className="FeedNew">
                <div className="row">
                    <div className="col-xs-12 col-md-12 tabs-holder">
                        <ul className="nav nav-tabs feed-panel">
                        {tabs}
                        </ul>
                    </div>
                    <div className="col-xs-12 col-md-12">
                        {panels}
                    </div>
                </div>
            </div>
        );
    }
}