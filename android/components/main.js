import * as firebase from 'firebase';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Tabs} from './navigator';

export default class Main extends Component {
  constructor(props) {
    super(props);
    // this.state = {dataSource: ""};
    this.state = {challenges: []};
  }

  listenForItems() {
    const challenges = [];
    const userID = firebase.auth().currentUser.uid;
    const challengesRef = firebase.database().ref('users/' + userID + '/challenges');

    challengesRef.on('value', (snapshot) => {
      snapshot.forEach((child) => {
        challenges.push(child.key);
      });
      this.setState({challenges});
      console.log("STATE", this.state);
    });

    // firebase.database().ref('users/' + firebase.auth().currentUser + '/challenges').on('value', (snapshot) => {
    //   var items = [];
    //   snapshot.forEach((child) => {
    //     console.log("snap ------------", child.val());
    //     // items.push({
    //     //   title: child.val().title,
    //     //   _key: child.key
    //     // });
    //   });
    //   this.setState({
    //     dataSource: this.state.dataSource.cloneWithRows(items)
    //   });
    // });
  }

  componentDidMount() {
    this.listenForItems();
  }

  render() {
    return (
      <Tabs/>
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
  }
});
