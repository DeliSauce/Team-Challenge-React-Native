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

  createChallenge() {
    const admin = firebase.auth().currentUser.uid;
    const users = [admin, 'John'];
    const categories = ['pushups', 'run', 'walk'];
    const startDate = '01-23-2017';
    const days = 10;
    const name = "Fitness Challenge";
    actions.createChallenge(name, admin, users, categories, startDate, days);
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
