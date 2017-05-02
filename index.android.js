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



  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

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
