import * as firebase from 'firebase';
import React, {Component} from 'react';
import * as actions from '../actions/firebase_actions';

import {
  Slider,
  Picker,
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
      name: 'Health Challenge',
      startDate: '01-23-2017',
      days: '10',
      adminID: this.userID,
      users: [this.userID, 'TEST'],
      categories: ['pushups', 'run', 'walk']
    };
    this.state = {days: '30'};
  }

  //TODO add userIDs for users other than admin
  createChallenge() {
    // console.log('creaete chall', this.state, this.defaultChallenge, this.userID);
    actions.createChallenge(this.state);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{width: 300, height: 50, flexDirection: 'row', borderColor: 'gray', borderWidth: 1}}>
          <Text> Challenge Name </Text>
          <TextInput
            placeholder={"Challenge Name"}
            style={{height: 40, width: 160}}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
            />
        </View>

        <View style={{width: 300, height: 50, flexDirection: 'row', borderColor: 'gray', borderWidth: 1}}>
          <Text> Start Date </Text>
          <TextInput
            placeholder={"Start Date"}
            style={{height: 40, width: 160}}
            onChangeText={(startDate) => this.setState({startDate})}
            value={this.state.startDate}
            />

        </View>

        <View style={{width: 300, height: 50, flexDirection: 'column', borderColor: 'gray', borderWidth: 1}}>
          <Text> Length of Challenge (days) </Text>
          <View style={{flexDirection: 'row'}}>
            <Slider
              style={{height: 40, width: 160}}
              onSlidingComplete={(days) => {}}
              onValueChange={(days) => this.setState({days})}
              minimumValue={1}
              maximumValue={60}
              value={30}
              step={1}
              >
            </Slider>
            <Text> {this.state.days} </Text>

          </View>
        </View>

        <TextInput
          placeholder={"Competitors"}
          style={{height: 50, width: 300, borderColor: 'gray', borderWidth: 1}}
          value={''}

          />
        <Button title={'Add User'} onPress={() => {}}>
        </Button>
        <TextInput
          placeholder={"Categories"}
          style={{height: 50, width: 300, borderColor: 'gray', borderWidth: 1}}
          value={''}

          />
        <Button title={'Add User'} onPress={() => {}}>
        </Button>

        <TouchableOpacity onPress={() => this.createChallenge()}
        style={{height: 40, width: 90, borderColor: 'skyblue', borderWidth: 1, backgroundColor: 'powderblue'}}>
         <Text> Add Challenge </Text>
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
