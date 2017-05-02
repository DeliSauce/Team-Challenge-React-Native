/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as firebase from 'firebase';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCd1k9W7IWnry1C51UTWAERUqDNZoeZwdI",
  authDomain: "teamchallenge-7823a.firebaseapp.com",
  databaseURL: "https://teamchallenge-7823a.firebaseio.com",
  projectId: "teamchallenge-7823a",
  storageBucket: "teamchallenge-7823a.appspot.com",
  messagingSenderId: "99575308379"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);


export default class TeamChallenge extends Component {
  constructor(props) {
    super(props);
    this.state = {email: "test@gmail.com", pass: "1234567", authStatus: false};

    this.signup = this.signup.bind(this);
  }

  async signup() {
    try {
        await firebase.auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.pass);
        console.log("Account created");
        this.setState({authStatus: "Account created"});
        // Navigate to the Home page, the user is auto logged in
    } catch (error) {
        console.log("getting an auth error", error.toString());
        this.setState({authStatus: error.toString()});
    }
  }

  // async login(email, pass) {
  //   try {
  //       await firebase.auth()
  //           .signInWithEmailAndPassword(email, pass);
  //       console.log("Logged In!");
  //       // Navigate to the Home page
  //   } catch (error) {
  //       console.log(error.toString())
  //   }
  // }
  //
  // async logout() {
  //   try {
  //       await firebase.auth().signOut();
  //       // Navigate to login view
  //   } catch (error) {
  //       console.log(error);
  //   }
  // }


  render() {
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
          {this.state.authStatus ? this.state.authStatus : ""}
        </TextInput>

        <Button
          onPress={this.signup}
          title="Sign Up"
          color="#841584"
        />

        <Text style={styles.instructions}>
          When in testing mode, shake phone to reload app.
        </Text>

        <View>

        </View>
      </View>
    );
  }
}
// <TouchableOpacity onPress={this.signup}
//   style={{height: 40, width: 70, borderColor: '#841584', borderWidth: 1}}>
//   <Text> Sign Up </Text>
// </TouchableOpacity>


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
