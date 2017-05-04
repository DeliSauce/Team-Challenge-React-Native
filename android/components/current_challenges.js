import * as firebase from 'firebase';
import React, {Component} from 'react';
import * as actions from '../actions/firebase_actions';

import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet
} from 'react-native';

export default class CurrentChallenges extends Component {
  constructor(props) {
    super(props);
  }

  //TODO needs a lot of work; need to test the firebase function; doesn't render anything
  showChallenges() {
    const user = firebase.auth().currentUser;
    console.log("show ch, user: ", user, user.uid);
    if (user) {
      const userID = user.uid;
      const challengesRef = firebase.database().ref('users/' + userID + '/challenges');
      console.log("challengesref: ", challengesRef);
      challengesRef.on('value', function(snapshot) {
        console.log(snapshot.val());
      });
    }

    return (
      <View>

      </View>
    );
  }

  

  render() {
    return (
      <View style={styles.container}>
         {this.showChallenges()}
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
  errors: {
    textAlign: 'center',
    alignSelf: "stretch",
    color: 'red',
  }
});
