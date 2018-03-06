import React, { Component } from 'react';
import './EditUser.css';
import avatarPlaceholder from '../assets/avatarPlaceholder.png';

export default class EditUser extends Component {

    handleSave() {
        this.props.handleUserSave();
        this.props.handleUserMenu('overview');
    }

    render() {

        let editUser = this.props.editUser;
        //console.log(JSON.stringify(editUser));
        let editFields;

        if (editUser.userType === 1) {
            editFields = [
                <div className="inputHolder" key="name">
                    <div className="inputLabel">Nome</div>
                    <input type="text" className="textInput" placeholder="" name="name" value={editUser.name || ''} onChange={this.props.handleInfoChange} />
                </div>,
                <div className="inputHolder" key="email">
                    <div className="inputLabel">E-mail</div>
                    <input type="text" className="textInput" placeholder="" name="email" value={editUser.email || ''} onChange={this.props.handleInfoChange} />
                </div>,
                <div className="inputHolder" key="country">
                    <div className="inputLabel">Country</div>
                    <input type="text" className="textInput" placeholder="" name="country" value={editUser.country || ''} onChange={this.props.handleInfoChange} />
                </div>,
                <div className="inputHolder" key="city">
                    <div className="inputLabel">City</div>
                    <input type="text" className="textInput" placeholder="" name="city" value={editUser.city || ''} onChange={this.props.handleInfoChange} />
                </div>
            ];
        } else if (editUser.userType === 2) {
            editFields = [
                <div className="inputHolder" key="name">
                    <div className="inputLabel">Nome</div>
                    <input type="text" className="textInput" placeholder="" name="name" value={editUser.name || ''} onChange={this.props.handleInfoChange} />
                </div>,
                <div className="inputHolder" key="email">
                    <div className="inputLabel">E-mail</div>
                    <input type="text" className="textInput" placeholder="" name="email" value={editUser.email || ''} onChange={this.props.handleInfoChange} />
                </div>,
                <div className="inputHolder" key="rate">
                    <div className="inputLabel">Rate</div>
                    <input type="text" className="textInput" placeholder="" name="rate" value={editUser.rate || ''} onChange={this.props.handleInfoChange} />
                </div>,
                <div className="inputHolder" key="statement">
                    <div className="inputLabel">Personal Statement</div>
                    <input type="text" className="textInput" placeholder="" name="statement" value={editUser.statement || ''} onChange={this.props.handleInfoChange} />
                </div>
            ];
        }


        return (
            <div className="EditUser">
                {editFields}
                <button className="btn btn-lg btn-primary float-left actionBtn" onClick={() => this.handleSave()}>Save</button> 
            </div>
        );
    }
}