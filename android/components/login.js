import * as firebase from 'firebase';
import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import store from 'react-native-simple-store';
import merge from 'lodash/merge';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {email: 'john.evans8@gmail.com', pass: "123456", authMessage: ''};
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }

  //TODO remove this code -- only for testing purposes
  componentWillMount() {
    this.login();
    // this.getAuthStatus()
    // if (this.getAuthStatus()) {
    //   this.props.navigation.navigate('MainNav')
    // }
  }

  async signup() {
    try {
      const user = await firebase.auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.pass);

      const userInfo = {
        name: user.providerData[0].displayName,
        email: user.providerData[0].email,
        photo: user.providerData[0].photoURL,
        provider: user.providerData[0].providerId,
      }

      // console.log("signup user: ", user);
      store.save('userData', merge({id: user.uid}, userInfo))

      // Code for getting userData from the store
      // store.get('userData')
      //   .then((data) => console.log("data saved: ", data))
      //   .catch((error) => console.log("data not saved: ", error));

      this.props.navigation.navigate('MainNav');
      // AsyncStorage.setItem('userData', JSON.stringify(user.providerData[0]));

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

      const userInfo = {
        name: user.providerData[0].displayName,
        email: user.providerData[0].email,
        photo: user.providerData[0].photoURL,
        provider: user.providerData[0].providerId,
        id: user.uid,
      }
      store.save('userData', userInfo);

      this.props.navigation.navigate('MainNav');

    } catch (error) {
        console.log("login error", error.toString());
        this.setState({authMessage: error.toString()});
    }
  }

  //onAuthStateChanged is the preferred method for checking current user but
  // I could not get it to work correctly. May require lifecycle methods?
  // firebase.auth().onAuthStateChanged(function(user) {
  // });

  getAuthStatus() {
    var user = firebase.auth().currentUser;
      if (user) {
        return true;
      } else {
        console.log("auth status: ", user);
        return false;
      }
  }


  render() {
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
