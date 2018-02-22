import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import Subscribe from './Subscribe';
import Parse from 'parse';
import User from './helpers/User';
import ParseHelper from './helpers/ParseHelper';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentScreen: 'home',
      auth: false,
      loginError: null,
      editUser: null,
      currentUser: null
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleBtnInput = this.handleBtnInput.bind(this);
    this.handleInfoChange = this.handleInfoChange.bind(this);
    this.handlePictureInput = this.handlePictureInput.bind(this);
    this.handleSubscribe = this.handleSubscribe.bind(this);
  }

  componentWillMount() {
    this.initializeParse();
  }

  componentDidMount() {
    if (User.current()) {
      ParseHelper.checkAuth(User.current()).then((auth) => {
        if (auth) {
          this.setState({
            currentScreen: 'home',
            auth: true,
            loginError: null,
            currentUser: User.current()
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

  showPage(page) {

    if (page === 'login') {
      this.setState({
        currentScreen: page
      });
    } else if (page === 'subscribe') {
      this.setState({
        currentScreen: page,
        editUser: ParseHelper.emptyUserData()
      });
    }
    
  }

  handleLogin(email,password) {
    User.logIn(email, password).then((user) => {
      ParseHelper.checkAuth(user).then((auth) => {
        if (auth) {
          this.setState({
            currentScreen: 'home',
            auth: true,
            loginError: null,
            currentUser: user
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

  handleSubscribe() {
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

    let parseUser = new User();
    ParseHelper.updateParseUser(parseUser,editUser,parseFile);
    parseUser.save().then((user) => {
      console.log(JSON.stringify(user));
      this.setState({
        currentScreen: 'login',
        editUser: null
      })
    }, (error) => {
      console.log(error);
    });

  }

  render() {

    var currentUser = this.state.currentUser ? this.state.currentUser : null;
    let avatar;
    let name;
    let email;
    let userType;
    let country;
    let city;
    let rate;
    let statement;
    let userInfo;

    if (currentUser) {
      avatar = currentUser.get('avatar').url();
      name = currentUser.get('name');
      email = currentUser.get('email');
      userType = currentUser.get('userType') === 1 ? "Student" : "Teacher";
      country = currentUser.get('country');
      city = currentUser.get('city');
      rate = currentUser.get('rate');
      statement = currentUser.get('personalStatement');

      if (currentUser.get('userType') === 1) {
        userInfo = [
        <img src={avatar} alt="" key="avatar" className="avatar" />,
        <div key="name">Name: {name}</div>,
        <div key="email">E-mail: {email}</div>,
        <div key="userType">User Type: {userType}</div>,
        <div key="country">Country: {country}</div>,
        <div key="city">City: {city}</div>
        ]
      } else {
        userInfo = [
        <img src={avatar} alt="" key="avatar" />,
        <div key="name">Name: {name}</div>,
        <div key="email">E-mail: {email}</div>,
        <div key="userType">User Type: {userType}</div>,
        <div key="rate">Rate: ${rate}</div>,
        <div key="statement">Statement: {statement}</div>
        ]
      }
    }


    return (
      <div className="App">
        {this.state.currentScreen === "home" && this.state.auth &&
          <div className="profile">
            <div className="logoutBtnHolder">
              <div className="btn btn-danger logoutBtn" onClick={() => this.handleLogout()}>Logout</div>
            </div>
            {userInfo}
          </div>
        }
        {this.state.currentScreen === "home" && !this.state.auth &&
          <div className="centeredBox small">
            <div className="mb-3">You must Log in or subscribe</div>
            <button className="btn btn-default" onClick={() => this.showPage("login")}>Log In</button>
            <button className="btn btn-primary ml-2" onClick={() => this.showPage("subscribe")}>Subscribe</button>
          </div>
        }
        { this.state.currentScreen === "login" && !this.state.auth &&
          <Login handleLogin={this.handleLogin} loginError={this.state.loginError} />
        }
        { this.state.currentScreen === "subscribe" && !this.state.auth &&
          <Subscribe editUser={this.state.editUser} handleBtnInput={this.handleBtnInput} handleInfoChange={this.handleInfoChange}
          handlePictureInput={this.handlePictureInput} handleSubscribe={this.handleSubscribe} />
        }
      </div>
    );
  }

  initializeParse() {
    Parse.initialize('YAFUtPWHeBWVeEjiwZmq2WQFPIEsXFL0yq4oA0fy','jKwDKSvlbp3LhufFwXTyjiOOQS2W6wjtdGQIPrjo');
    Parse.serverURL = 'https://parseapi.back4app.com/';
  
    Parse.Object.registerSubclass('User', User);
  }

}

export default App;
