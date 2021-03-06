import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Profile from './Profile/index.js';
import VideoComponent from './VideoComponent';
import ChatComponent from './ChatComponent/ChatComponent';
import Parse from 'parse';
import User from './helpers/User';
import Notification from './helpers/Notification';
import Category from './helpers/Category';
import ParseHelper from './helpers/ParseHelper';
import strings from './localization/strings';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentScreen: null,
      auth: false,
      loginError: null,
      editUser: null,
      currentUser: null,
      notificationsArray: null,
      currentLanguage: 'en'
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleBtnInput = this.handleBtnInput.bind(this);
    this.handleInfoChange = this.handleInfoChange.bind(this);
    this.handlePictureInput = this.handlePictureInput.bind(this);
    this.handleSubscribeAccess = this.handleSubscribeAccess.bind(this);
    this.handleUserSave = this.handleUserSave.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSettingsAccess = this.handleSettingsAccess.bind(this);
    this.handleNotificationChange = this.handleNotificationChange.bind(this);
    this.updateNotifications = this.updateNotifications.bind(this);
    this.handleLanguageSelection = this.handleLanguageSelection.bind(this);
    this.handleCategorySelection = this.handleCategorySelection.bind(this);
  }

  componentWillMount() {
    this.initializeParse();
  }

  componentDidMount() {
    if (User.current()) {
      var authPromise = ParseHelper.checkAuth(User.current());
      var notifPromise = ParseHelper.fetchUserNotifications(User.current().id,User.current().get("userType"));

      return Promise.all([authPromise,notifPromise]).then(values => {
        if (values[0]) {
          localStorage.setItem('name', User.current().get('name'));
          this.setState({
            currentScreen: 'profile',
            auth: true,
            loginError: null,
            currentUser: User.current(),
            notificationsArray: values[1]
          });
        } else {
          this.setState({
            currentScreen: 'signin',
            auth: false,
            loginError: null
          });
        }
      });

    } else {
      this.setState({
        currentScreen: 'signin',
        auth: false,
        loginError: null
      });
    }
  }

  handleLogin(email,password) {
    User.logIn(email, password).then((user) => {
      var authPromise = ParseHelper.checkAuth(User.current());
      var notifPromise = ParseHelper.fetchUserNotifications(User.current().id,User.current().get("userType"));

      return Promise.all([authPromise,notifPromise]).then(values => {
        if (values[0]) {
          localStorage.setItem('name', user.get('name'));
          this.setState({
            currentScreen: 'profile',
            auth: true,
            loginError: null,
            currentUser: user,
            notificationsArray: values[1]
          });
        } else {
          this.setState({
            currentScreen: 'signin',
            auth: false,
            loginError: strings.signInErrorOne
          });
        }
      });

    },(err)=> {
      this.setState({
        currentScreen: 'signin',
        auth: false,
        loginError: strings.signInErrorTwo
      });
    });
  }

  handleLogout() {
    User.logOut().then(() => {
      this.setState({
        currentScreen: 'signin',
        auth: false,
        loginError: null,
      });
    });
  }

  handleLanguageSelection(lang) {
    this.setState({
      currentLanguage: lang
    });
  }

  handleBtnInput(att, value) {
    var original = this.state.editUser;
    var user = JSON.parse(JSON.stringify(original));
    user[att] = value;
    this.setState({
      editUser: user
    });
  }

  handleInfoChange(evt) {
    var original = this.state.editUser;
    var user = JSON.parse(JSON.stringify(original));
    user[evt.target.name] = evt.target.value;
    this.setState({
      editUser: user
    });
  }

  handlePictureInput(file) {
    var original = this.state.editUser;
    var user = JSON.parse(JSON.stringify(original));
    var reader = new FileReader();
    reader.onload = function(event) {
      user["avatar"] = event.target.result;
      this.setState({
        editUser: user
      });
    }.bind(this);
    reader.readAsDataURL(file);
  }

  handleCategorySelection(evt) {
    var original = this.state.editUser;
    var user = JSON.parse(JSON.stringify(original));
    var category = Category.createWithoutData(evt.target.value);
    user['category'] = category;
    this.setState({
      editUser: user
    });


  }

  handleSettingsAccess() {
    var editUser = ParseHelper.userDataFromObject(this.state.currentUser);
    this.setState({
      editUser: editUser
    });
  }

  handleSubscribeAccess() {
    var editUser = ParseHelper.emptyUserData();
    this.setState({
      editUser: editUser
    });
  }

  handleNotificationChange(notificationID, action) {
    var parseNotif = Notification.createWithoutData(notificationID);
    parseNotif.set("type",action);
    parseNotif.save().then((notification) => {
      this.updateNotifications();
    });
  }

  updateNotifications() {
    ParseHelper.fetchUserNotifications(User.current().id,User.current().get("userType")).then((allNotifs) => {
      this.setState({
        notificationsArray: allNotifs
      });
    });
  }

  handleUserSave() {
    const editUser = this.state.editUser;

    let parseFile;
    if (editUser.avatar && typeof editUser.avatar === 'string') { 
      var str = editUser.avatar;
      var arr = str.split(':',1);
      if (arr[0] === 'data') {
        var name = editUser.name + '.jpg'; 
        parseFile = new Parse.File(name, {base64: editUser.avatar});
      }
    }

    let parseUser;
    if (editUser.id) {
      parseUser = User.createWithoutData(editUser.id);
    } else {
      parseUser = new User();
    }
    ParseHelper.updateParseUser(parseUser,editUser,parseFile);
    parseUser.save().then((user) => {
      console.log(JSON.stringify(user));
      this.setState({
        editUser: null
      })
    }, (error) => {
      console.log(error);
    });
  }

  handlePageChange(page) {
    this.setState({
      currentScreen: page
    });
  }

  render() {

    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => (
            <Home currentScreen={this.state.currentScreen} handlePageChange={this.handlePageChange} />
            )} />
          <Route path="/signin" render={() => (
            <SignIn handleLogin={this.handleLogin} loginError={this.state.loginError} currentScreen={this.state.currentScreen} handlePageChange={this.handlePageChange}/>
          )} />
          <Route path="/signup" render={() => (
            <SignUp editUser={this.state.editUser} handleBtnInput={this.handleBtnInput} handleInfoChange={this.handleInfoChange}
            handlePictureInput={this.handlePictureInput} handleSubscribeAccess={this.handleSubscribeAccess} handleUserSave={this.handleUserSave}
            currentScreen={this.state.currentScreen} handlePageChange={this.handlePageChange} handleCategorySelection={this.handleCategorySelection} />
          )} />
          <Route path="/profile" render={() => (
            <Profile handleLogout={this.handleLogout} currentScreen={this.state.currentScreen} handlePageChange={this.handlePageChange} 
            currentUser={this.state.currentUser} editUser={this.state.editUser} handleSettingsAccess={this.handleSettingsAccess}
            handleInfoChange={this.handleInfoChange} handleUserSave={this.handleUserSave} notificationsArray={this.state.notificationsArray}
            handleNotificationChange={this.handleNotificationChange} updateNotifications={this.updateNotifications} handlePictureInput={this.handlePictureInput}
            currentLanguage={this.state.currentLanguage} handleLanguageSelection={this.handleLanguageSelection}/>
          )} />
          <Route path="/video/:notificationID" render={(props) => (
            <VideoComponent notificationID={props.match.params.notificationID} />
          )} />
          <Route path="/chat/:notificationID" render={(props) => (
            <ChatComponent notificationID={props.match.params.notificationID} currentUser={this.state.currentUser} />
          )} />
        </Switch>
      </div>
    );
  }

  initializeParse() {
    Parse.initialize('YAFUtPWHeBWVeEjiwZmq2WQFPIEsXFL0yq4oA0fy','jKwDKSvlbp3LhufFwXTyjiOOQS2W6wjtdGQIPrjo');
    Parse.serverURL = 'https://parseapi.back4app.com/';
  
    Parse.Object.registerSubclass('User', User);
    Parse.Object.registerSubclass('Notification', Notification);
    Parse.Object.registerSubclass('Category', Category);
  }

}

export default App;
