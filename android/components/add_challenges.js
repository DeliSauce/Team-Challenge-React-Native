import * as firebase from 'firebase';
import React, {Component} from 'react';
import * as actions from '../actions/firebase_actions';

import {
  Button,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';

export default class AddChallenges extends Component {
  constructor(props) {
    super(props);
    this.userID = firebase.auth().currentUser.uid;
    this.defaultChallenge = {
      name: "Health Challenge",
      startDate: '01-23-2017',
      days: '10',
      adminID: this.userID,
      users: [this.userID, 'TEST'],
      categories: ['pushups', 'run', 'walk']
    };
    this.state = this.defaultChallenge;
  }

  //TODO add userIDs for users other than admin
  createChallenge() {
    actions.createChallenge(this.state);
  }

  showChallenges() {

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          CHALLENGES
        </Text>
        <TextInput
          placeholder={"Challenge Name"}
          style={{height: 40, width: 160, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
          />
        <TextInput
          placeholder={"Start Date"}
          style={{height: 40, width: 160, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(startDate) => this.setState({startDate})}
          value={this.state.startDate}
          />
        <TextInput
          placeholder={"Length of Challenge (days)"}
          style={{height: 40, width: 160, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(days) => this.setState({days})}
          value={this.state.days}
          />
        <TextInput
          placeholder={"Users"}
          style={{height: 40, width: 160, borderColor: 'gray', borderWidth: 1}}


          />
        <Button title={'Add User'} onPress={() => {}}>
        </Button>
        <TextInput
          placeholder={"Categories"}
          style={{height: 40, width: 160, borderColor: 'gray', borderWidth: 1}}


          />
        <Button title={'Add User'} onPress={() => {}}>
        </Button>

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
