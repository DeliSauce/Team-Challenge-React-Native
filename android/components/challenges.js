import * as firebase from 'firebase';
import React, {Component} from 'react';
import * as actions from '../actions/firebase_actions';

import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet
} from 'react-native';

export default class Challenges extends Component {
  constructor(props) {
    super(props);
  }

  //TODO add userIDs for users other than admin
  createChallenge() {
    const userID = firebase.auth().currentUser.uid;
    const adminID = userID;
    const users = [adminID, 'John'];
    const categories = ['pushups', 'run', 'walk'];
    const startDate = '01-23-2017';
    const days = 10;
    const name = "Health Challenge";
    actions.createChallenge(name, adminID, users, categories, startDate, days);
  }

  showChallenges() {

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          CHALLENGES
         </Text>
         <TouchableOpacity onPress={this.createChallenge}
         style={{height: 40, width: 70, borderColor: '#841584', borderWidth: 1}}>
           <Text> add challenge </Text>
         </TouchableOpacity>
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
