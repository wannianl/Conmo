import React, { Component } from 'react';
import './SignUp.css';
import avatarPlaceholder from './assets/avatarPlaceholder.png'
import { Redirect } from 'react-router-dom';
import ParseHelper from './helpers/ParseHelper';
import strings from './localization/strings';

export default class SignUp extends Component {

  constructor(props) {
      super(props);
      this.state = {
          categories: []
      }
  }

  componentDidMount() {
    this.props.handleSubscribeAccess();
    ParseHelper.fetchCategories().then((categories) => {
        this.setState({
            categories: categories
        });
    });
    
  }

  handlePictureInput(file) {
    this.props.handlePictureInput(file);
  }

  handleSubscription() {
      this.props.handleUserSave();
      this.props.handlePageChange('signin');
  }

  render() {

    if (this.props.currentScreen === 'signin') {
        return <Redirect push to="/signin" />;
    } else if (this.props.currentScreen === 'profile') {
        return <Redirect push to="/profile" />;
    }

    var classCategories = this.state.categories.map((category) => {
        return (
            <option value={category.id}>{category.get("Category")}</option>
        )
    });

    var editUser = this.props.editUser;

    return (
      <div className="SignUp whiteBg">
        {editUser ?
        <div className="subscribeCont whiteBg">
            <input type="button" className={editUser.userType === 1 ? "btnInput btnLeft btnActive" : "btnInput btnLeft" } value="Student" onClick={() => this.props.handleBtnInput('userType',1)} />
            <input type="button" className={editUser.userType === 2 ? "btnInput btnRight btnActive" : "btnInput btnRight" } value="Teacher" onClick={() => this.props.handleBtnInput('userType',2)} />
            <div className="innerContainer">
                <img src={editUser.avatar ? editUser.avatar : avatarPlaceholder} alt="" className="subscribeBoxImg" />
                <form method="POST" encType="multipart/form-data" action="/upload" id="uploadForm">
                    <label className="uploadButton" id="submitFileBtn">
                        <i className="fas fa-camera"></i>
                        <input ref="file" type="file" name="upload" id="inputFile" accept="image/gif, image/jpeg, image/jpg, , image/png" onChange={() => this.handlePictureInput(document.getElementById("uploadForm")[0].files[0])}/>
                    </label>
                </form> 
                <div className="inputHolder">
                    <div className="defaultLabel">{strings.name}</div>
                    <input type="text" className="defaultInput" name="name" value={editUser.name || ''} onChange={this.props.handleInfoChange} />
                </div>
                <div className="inputHolder">
                    <div className="defaultLabel">{strings.email}</div>
                    <input type="email" className="defaultInput" name="email" value={editUser.email || ''} onChange={this.props.handleInfoChange} />
                </div>
                <div className="inputHolder">
                    <div className="defaultLabel">{strings.password}</div>
                    <input type="password" className="defaultInput" name="password" value={editUser.password || ''} onChange={this.props.handleInfoChange} />
                </div>
                {editUser.userType === 1 ?
                <div>
                    <div className="inputHolder">
                        <div className="defaultLabel">{strings.country}</div>
                        <input type="text" className="defaultInput" name="country" value={editUser.country || ''} onChange={this.props.handleInfoChange} />
                    </div>
                    <div className="inputHolder">
                        <div className="defaultLabel">{strings.city}</div>
                        <input type="text" className="defaultInput" name="city" value={editUser.city || ''} onChange={this.props.handleInfoChange} />
                    </div>
                </div>
                :
                <div>
                    <div className="inputHolder">
                        <div className="defaultLabel">{strings.rate}</div>
                        <input type="number" className="defaultInput" name="rate" value={editUser.rate || ''} onChange={this.props.handleInfoChange} />
                    </div>
                    <div className="inputHolder">
                        <div className="defaultLabel">{strings.statement}</div>
                        <input type="text" className="defaultInput" name="statement" value={editUser.statement || ''} onChange={this.props.handleInfoChange} />
                    </div>
                    <div className="inputHolder">
                        <div className="defaultLabel">{strings.course}</div>
                        <select name="category" className="defaultSelect" onChange={this.props.handleCategorySelection}>
                            <option>--Select--</option>
                            {classCategories}
                        </select>
                    </div>
                </div>
                }
                <button className="btn actionBtn confirmBtn" onClick={() => this.handleSubscription()}>{strings.signUp}</button>  
            </div>
            <div className="textBtn" onClick={() => this.props.handlePageChange("signin")}><i className="fas fa-user"></i>{strings.signIn}</div>
        </div>
        :
        <div>{strings.loading}</div>
        }
      </div>
    );
  }
}