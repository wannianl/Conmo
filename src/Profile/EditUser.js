import React, { Component } from 'react';
import './EditUser.css';
import avatarPlaceholder from '../assets/avatarPlaceholder.png';
import strings from '../localization/strings';

export default class EditUser extends Component {

    componentWillReceiveProps(nextProps) {
        if(nextProps.currentLanguage) {
            if(nextProps.currentLanguage === 'zh') {
                strings.setLanguage('zh');
            } else {
                strings.setLanguage('en');
            }
        }
    }
    
    handleSave() {
        this.props.handleUserSave();
        this.props.handleUserMenu('overview');
    }

    handlePictureInput(file) {
        this.props.handlePictureInput(file);
    }

    render() {

        let editUser = this.props.editUser;
        let editFields;

        if (editUser.userType === 1) {
            editFields = [
                <img src={editUser.avatar ? editUser.avatar : avatarPlaceholder} alt="" className="addBoxImg" key="picture" />,
                <form method="POST" encType="multipart/form-data" action="/upload" id="uploadForm" key="uploadForm">
                    <label className="uploadButton" id="submitFileBtn">
                        <i className="fas fa-camera"></i>
                        <input ref="file" type="file" name="upload" id="inputFile" accept="image/gif, image/jpeg, image/jpg, , image/png" onChange={() => this.handlePictureInput(document.getElementById("uploadForm")[0].files[0])}/>
                    </label>
                </form>,
                <div className="inputHolder" key="name">
                    <div className="inputLabel">{strings.name}</div>
                    <input type="text" className="textInput" placeholder="" name="name" value={editUser.name || ''} onChange={this.props.handleInfoChange} />
                </div>,
                <div className="inputHolder" key="email">
                    <div className="inputLabel">{strings.email}</div>
                    <input type="text" className="textInput" placeholder="" name="email" value={editUser.email || ''} onChange={this.props.handleInfoChange} />
                </div>,
                <div className="inputHolder" key="country">
                    <div className="inputLabel">{strings.country}</div>
                    <input type="text" className="textInput" placeholder="" name="country" value={editUser.country || ''} onChange={this.props.handleInfoChange} />
                </div>,
                <div className="inputHolder" key="city">
                    <div className="inputLabel">{strings.city}</div>
                    <input type="text" className="textInput" placeholder="" name="city" value={editUser.city || ''} onChange={this.props.handleInfoChange} />
                </div>
            ];
        } else if (editUser.userType === 2) {
            editFields = [
                <img src={editUser.avatar ? editUser.avatar : avatarPlaceholder} alt="" className="addBoxImg" key="picture" />,
                <form method="POST" encType="multipart/form-data" action="/upload" id="uploadForm" key="uploadForm">
                    <label className="uploadButton" id="submitFileBtn">
                        <i className="fas fa-camera"></i>
                        <input ref="file" type="file" name="upload" id="inputFile" accept="image/gif, image/jpeg, image/jpg, , image/png" onChange={() => this.handlePictureInput(document.getElementById("uploadForm")[0].files[0])}/>
                    </label>
                </form>,
                <div className="inputHolder" key="name">
                    <div className="inputLabel">{strings.name}</div>
                    <input type="text" className="textInput" placeholder="" name="name" value={editUser.name || ''} onChange={this.props.handleInfoChange} />
                </div>,
                <div className="inputHolder" key="email">
                    <div className="inputLabel">{strings.email}</div>
                    <input type="text" className="textInput" placeholder="" name="email" value={editUser.email || ''} onChange={this.props.handleInfoChange} />
                </div>,
                <div className="inputHolder" key="rate">
                    <div className="inputLabel">{strings.rate}</div>
                    <input type="text" className="textInput" placeholder="" name="rate" value={editUser.rate || ''} onChange={this.props.handleInfoChange} />
                </div>,
                <div className="inputHolder" key="statement">
                    <div className="inputLabel">{strings.statement}</div>
                    <input type="text" className="textInput" placeholder="" name="statement" value={editUser.statement || ''} onChange={this.props.handleInfoChange} />
                </div>
            ];
        }


        return (
            <div className="EditUser">
                {editFields}
                <button className="btn actionBtn confirmBtn" onClick={() => this.handleSave()}>{strings.save}</button> 
            </div>
        );
    }
}