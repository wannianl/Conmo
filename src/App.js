import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Subscribe from './Subscribe';
import Profile from './Profile/index.js';
import Parse from 'parse';
import User from './helpers/User';
import Notification from './helpers/Notification';
import ParseHelper from './helpers/ParseHelper';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentScreen: null,
      auth: false,
      loginError: null,
      editUser: null,
      currentUser: null,
      notificationsArray: null
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
          this.setState({
            currentScreen: 'profile',
            auth: true,
            loginError: null,
            currentUser: User.current(),
            notificationsArray: values[1]
          });
        } else {
          this.setState({
            currentScreen: 'home',
            auth: false,
            loginError: null
          });
        }
      });

    } else {
      this.setState({
        currentScreen: 'home',
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
          this.setState({
            currentScreen: 'profile',
            auth: true,
            loginError: null,
            currentUser: user,
            notificationsArray: values[1]
          });
        } else {
          this.setState({
            currentScreen: 'login',
            auth: false,
            loginError: 'User is not registered'
          });
        }
      });

    },(err)=> {
      this.setState({
        currentScreen: 'login',
        auth: false,
        loginError: "Incorrect e-mail or password"
      });
    });
  }

  handleLogout() {
    User.logOut().then(() => {
      this.setState({
        currentScreen: 'home',
        auth: false,
        loginError: null,
      });
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
          <Route path="/login" render={() => (
            <Login handleLogin={this.handleLogin} loginError={this.state.loginError} currentScreen={this.state.currentScreen} handlePageChange={this.handlePageChange}/>
          )} />
          <Route path="/subscribe" render={() => (
            <Subscribe editUser={this.state.editUser} handleBtnInput={this.handleBtnInput} handleInfoChange={this.handleInfoChange}
            handlePictureInput={this.handlePictureInput} handleSubscribeAccess={this.handleSubscribeAccess} handleUserSave={this.handleUserSave}
            currentScreen={this.state.currentScreen} handlePageChange={this.handlePageChange} />
          )} />
          <Route path="/profile" render={() => (
            <Profile handleLogout={this.handleLogout} currentScreen={this.state.currentScreen} handlePageChange={this.handlePageChange} 
            currentUser={this.state.currentUser} editUser={this.state.editUser} handleSettingsAccess={this.handleSettingsAccess}
            handleInfoChange={this.handleInfoChange} handleUserSave={this.handleUserSave} notificationsArray={this.state.notificationsArray}
            handleNotificationChange={this.handleNotificationChange} updateNotifications={this.updateNotifications}/>
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
  }

}

export default App;
