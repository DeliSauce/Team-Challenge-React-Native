/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 // This import loads the firebase namespace along with all its type information.
 import * as firebase from 'firebase/app';

 // These imports load individual services into the firebase namespace.
 import 'firebase/auth';
 import 'firebase/database';

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
    this.state = {email: "", pass: ""};

    this.signup = this.signup.bind(this);
  }

  async signup() {
    try {
        await firebase.auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.pass);
        console.log("Account created");
        // Navigate to the Home page, the user is auto logged in
    } catch (error) {
        console.log(error.toString())
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

        <Text> {this.state.email} </Text>
        <Text> {this.state.pass} </Text>

          <Button
            onPress={this.signup}
            title="Sign Up"
            color="#841584"
          />


        <Text style={styles.instructions}>
          Shake phone to reload
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
});

AppRegistry.registerComponent('TeamChallenge', () => TeamChallenge);
