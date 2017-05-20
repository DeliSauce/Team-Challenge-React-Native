import * as firebase from 'firebase';
import React, { Component } from 'react';
// import Main from './android/components/main';
import {MainNav} from './android/components/navigator';
import firebaseConfig from './env';
import {ThemeProvider, COLOR} from 'react-native-material-ui';

import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class TeamChallenge extends Component {
  constructor(props) {
    super(props);
    this.randomEmail = "test" + (Math.floor(Math.random() * (10000))) + "@gmail.com";

    this.state = {email: 'john.doe@gmail.com', pass: "123456", authStatus: this.getAuthStatus(), authMessage: ''};

    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }

  //TODO remove this code -- only for testing purposes
  componentWillMount() {
    // this.login();
  }

  async signup() {
    try {
      const user = await firebase.auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.pass);
      console.log("signup user: ", user);
      this.setState({authStatus: true});

      // //add user to firebase db
      // firebase.database().ref().child('users').child(user.uid).set({
      //   provider: user.providerData[0].providerId,
      //   name: user.providerData[0].displayName,
      //   email: user.providerData[0].email,
      //   photo: user.providerData[0].photoURL
      // });
      //
      // //add user to firebase db: userLookup
      // firebase.database().ref().child('userLookup').child(user.uid).set({
      //   email: user.providerData[0].email
      // });

      const userInfo = {
        provider: user.providerData[0].providerId,
        name: user.providerData[0].displayName,
        email: user.providerData[0].email,
        photo: user.providerData[0].photoURL
      }

      firebaseUpdates = {}
      firebaseUpdates['users/' + user.uid] = userInfo;
      firebaseUpdates['userLookup/' + user.uid] = userInfo;

      firebase.database().ref().update(firebaseUpdates);


    } catch (error) {
        console.log("getting an auth error", error.toString());
        this.setState({authMessage: error.toString()});
    }
  }

  async login() {
    try {
      const user = await firebase.auth()
          .signInWithEmailAndPassword(this.state.email, this.state.pass);
      console.log("log in user: ", user);
      this.setState({authStatus: true});
    } catch (error) {
        console.log("login error", error.toString());
        this.setState({authMessage: error.toString()});
    }
  }
  // LOGOUT METHOD -- WE MAY HAVE SOME USE FOR THIS DOWN THE ROAD
  // async logout() {
  //   try {
  //       await firebase.auth().signOut();
  //       // Navigate to login view
  //   } catch (error) {
  //       console.log(error);
  //   }
  // }



  getAuthStatus() {
    var user = firebase.auth().currentUser;
      if (user) {
        return true;
      } else {
        console.log("auth status: ", user);
        return false;
      }
  }


  renderLogin() {
    console.log("renderLogin");
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to TeamChallenge App
        </Text>
        <Text style={styles.instructions}>
          Enter email and password
        </Text>
        <TextInput
          placeholder={"email address"}
          style={{height: 40, width: 160, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          keyboardType="email-address"
          />
        <TextInput
          placeholder={"password"}
          style={{height: 40, width: 160, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(pass) => this.setState({pass})}
          value={this.state.pass}
          />

        <TextInput
          style={styles.errors}
          >
          {this.state.authMessage}
        </TextInput>

        <TouchableOpacity onPress={() => this.signup()}
        style={{height: 40, width: 70, borderColor: '#841584', borderWidth: 1}}>
          <Text> Sign Up </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.login()}
        style={{height: 40, width: 70, borderColor: '#841584', borderWidth: 1}}>
          <Text> Log In </Text>
        </TouchableOpacity>

        <Text style={styles.instructions}>
          When in testing mode, shake phone to reload app.
        </Text>

        <View>

        </View>
      </View>
    );
  }
    //onAuthStateChanged is the preferred method for checking current user but
    // I could not get it to work correctly. May require lifecycle methods?
    // firebase.auth().onAuthStateChanged(function(user) {
    // });

  renderMain(){

    const uiTheme = {
      // palette is lightTheme by default but can override values
      palette: {
        primaryColor: COLOR.green500,
        accentColor: COLOR.red500,
      },
      toolbar: {
        container: {
          height: 60
        },
      },
      action: {},
      card: {},
      button: {}
    };

    console.log("render main", this.state.authStatus);

    return (
      <ThemeProvider uiTheme={uiTheme}>
        <MainNav
          drawerWidth={100}
          drawerPosition={'right'}
        />
      </ThemeProvider>
    );
  }

  render() {
    if (this.state.authStatus) {
      return this.renderMain()
    } else {
      return this.renderLogin()
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  errors: {
    textAlign: 'center',
    alignSelf: "stretch",
    color: 'red',
  }
});

AppRegistry.registerComponent('TeamChallenge', () => TeamChallenge);
