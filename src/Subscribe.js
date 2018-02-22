import React, { Component } from 'react';
import './Subscribe.css';
import avatarPlaceholder from './assets/avatarPlaceholder.png'

export default class Subscribe extends Component {

  handlePictureInput(file) {
    this.props.handlePictureInput(file);
  }

  render() {

    var editUser = this.props.editUser;

    return (
      <div className="Subscribe">
        <div className="subscribeCont">
            <input type="button" className={editUser.userType === 1 ? "btnInput btnLeft btnActive" : "btnInput btnLeft" } value="Student" onClick={() => this.props.handleBtnInput('userType',1)} />
            <input type="button" className={editUser.userType === 2 ? "btnInput btnRight btnActive" : "btnInput btnRight" } value="Teacher" onClick={() => this.props.handleBtnInput('userType',2)} />
            <img src={editUser.avatar ? editUser.avatar : avatarPlaceholder} alt="" className="subscribeBoxImg" />
            <form method="POST" encType="multipart/form-data" action="/upload" id="uploadForm">
                <label className="uploadButton" id="submitFileBtn">
                    <i className="fas fa-camera"></i>
                    <input ref="file" type="file" name="upload" id="inputFile" accept="image/gif, image/jpeg, image/jpg, , image/png" onChange={() => this.handlePictureInput(document.getElementById("uploadForm")[0].files[0])}/>
                </label>
            </form> 
            <div className="inputHolder">
                <div className="inputLabel">Name</div>
                <input type="text" className="textInput" name="name" value={editUser.name || ''} onChange={this.props.handleInfoChange} />
            </div>
            <div className="inputHolder">
                <div className="inputLabel">E-mail</div>
                <input type="email" className="textInput" name="email" value={editUser.email || ''} onChange={this.props.handleInfoChange} />
            </div>
            <div className="inputHolder">
                <div className="inputLabel">Password</div>
                <input type="password" className="textInput" name="password" value={editUser.password || ''} onChange={this.props.handleInfoChange} />
            </div>
            {editUser.userType === 1 ?
              <div>
                <div className="inputHolder">
                    <div className="inputLabel">Country</div>
                    <input type="text" className="textInput" name="country" value={editUser.country || ''} onChange={this.props.handleInfoChange} />
                </div>
                <div className="inputHolder">
                    <div className="inputLabel">City</div>
                    <input type="text" className="textInput" name="city" value={editUser.city || ''} onChange={this.props.handleInfoChange} />
                </div>
              </div>
              :
              <div>
                <div className="inputHolder">
                    <div className="inputLabel">Rate</div>
                    <input type="number" className="textInput" name="rate" value={editUser.rate || ''} onChange={this.props.handleInfoChange} />
                </div>
                <div className="inputHolder">
                    <div className="inputLabel">Personal Statement</div>
                    <input type="text" className="textInput" name="statement" value={editUser.statement || ''} onChange={this.props.handleInfoChange} />
                </div>
              </div>
            }
            <button className="btn btn-lg btn-primary btn-block subscribeBtn" onClick={() => this.props.handleSubscribe()}>Subscribe</button>  
        </div>
      </div>
    );
  }
}