import * as firebase from 'firebase';
import React, {Component} from 'react';
import * as actions from '../actions/firebase_actions';

import {
  Slider,
  Picker,
  Button,
  FlatList,
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
      days: '30',
      adminID: this.userID,
      users: [this.userID, 'TEST'],
      categories: ['pushups', 'run', 'walk']
    };
    this.state = this.defaultChallenge;
  }

  //TODO add userIDs for users other than admin
  createChallenge() {
    // console.log('creaete chall', this.state, this.defaultChallenge, this.userID);
    actions.createChallenge(this.state);
  }

  handleUserInput(userStub) {
    let userSearch = actions.searchForUsers(userStub);
    this.setState({userSearch});
  }

  render() {
    return (
      <View style={styles.container}>

        <TouchableOpacity
          onPress={() => this.createChallenge()}
          style={styles.addChallengeButton}>
          <Text> Add Challenge </Text>
        </TouchableOpacity>

        <View style={styles.input_container}>
          <Text> Challenge Name </Text>
          <TextInput
            placeholder={"Challenge Name"}
            style={{height: 40, width: 160}}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
            />
        </View>

        <View style={styles.input_container}>
          <Text> Start Date </Text>
          <TextInput
            placeholder={"Start Date"}
            style={styles.input}
            onChangeText={(startDate) => this.setState({startDate})}
            value={this.state.startDate}
            />
        </View>

        <View style={styles.slider_container}>
          <Text> Length of Challenge (days) </Text>
          <View style={{flexDirection: 'row'}}>
            <Slider
              style={{height: 40, width: 260}}
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

        <View style={styles.input_container}>
          <Text> Categories </Text>
          <TextInput
            placeholder={"Add a New Categories"}
            style={styles.input}
            value={''}
            />
          <Button title={'Add Category'} onPress={() => {}}>
          </Button>
        </View>

        <View style={styles.input_container}>
          <Text> Competitors </Text>
          <TextInput
            placeholder={"Enter User Email"}
            style={styles.input}
            value={''}
            onChangeText={(user_info) => this.handleUserInput(user_info)}
            />
          <Button title={'Add User'} onPress={() => {}}>
          </Button>
        </View>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  addChallengeButton: {
    height: 60,
    width: 100,
    borderColor: 'skyblue',
    borderWidth: 1,
    backgroundColor: 'powderblue',
    marginTop: 40,
    justifyContent: 'center',
  },
  input: {
    height: 50,
    width: 150,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
  },
  input_container: {
    height: 50,
    width: 400,
    flexDirection: 'row',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  slider_container: {
    height: 50,
    width: 400,
    flexDirection: 'column',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  default_style: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'grey',
    borderColor: 'skyblue',
    borderWidth: 1
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
