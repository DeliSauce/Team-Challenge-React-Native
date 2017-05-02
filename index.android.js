import * as firebase from 'firebase';
import React, { Component } from 'react';
import Login from './android/components/login';

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
  }

  getPage() {
    // firebase.auth().onAuthStateChanged(function(user) {
    var user = firebase.auth().currentUser;
      if (user) {
        return (
          <View style={styles.container}>
            <Text style={styles.welcome}>
              Welcome to TeamChallenge App
            </Text>
            <Text style={styles.instructions}>
              Here are the current challenges for user: {user.email}
            </Text>
          </View>
        );
      } else {
        return (
          <Login />
        );
      }
    // });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.getPage()}
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
  }
});

AppRegistry.registerComponent('TeamChallenge', () => TeamChallenge);
