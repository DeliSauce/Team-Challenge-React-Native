import * as firebase from 'firebase';
import React, {Component} from 'react';
import * as actions from '../actions/firebase_actions';

import {
  Button,
  TouchableOpacity,
  ListView,
  ListItem,
  FlatList,
  View,
  Text,
  StyleSheet
} from 'react-native';


export default class CurrentChallenges extends Component {
  constructor(props) {
    super(props);
    this.testChallenges = [{id: 'ID001', name: 'Fitness Challenge'}, {id: 'ID002', name: 'Health Challenge'}];
    this.state = {
      challenges: this.testChallenges
    };
  }

  getChallenges() {
    // const challenges;
    const userID = firebase.auth().currentUser.uid;

    const challengesRef = firebase.database().ref('users/' + userID + '/challenges');
    challengesRef.once('value', (snapshot) => {
        console.log("challenges from db", Object.keys(snapshot.val()));
        this.setState({challenges: Object.keys(snapshot.val())});
      });
  }

  listenForItems() {
    const challenges = [];
    const userID = firebase.auth().currentUser.uid;
    const myChallengesRef = firebase.database().ref('users/' + userID + '/challenges');
    const challengesRef = firebase.database().ref('challenges');

    // challengesRef.on('child_added', (snap) => console.log("chall child added", snap.val()));
    // challengesRef.on('value', (snap) => console.log("chall value", snap.val()));

    myChallengesRef.on('child_added', (snap) => {
      console.log("chall child added", snap.key)
    })

    // myChallengesRef.on('value', (snapshot) => {
    //   console.log('snapshot.foreach', snapshot.val());
    //   challenges = Object.keys(snapshot.key);
    //   snapshot.forEach((child) => {
    //     challenges.push(child.key);
    //   });
    //   this.setState({challenges});
    //   console.log("STATE", this.state);
    // });

  }

  componentDidMount() {
    console.log("get challenges: ", this.state.challenges);
    // this.getChallenges();
    console.log("get challenges: ", this.state.challenges);
    this.listenForItems();
  }

  renderChallenge = ({item, index}) => {
    const {navigate} = this.props.navigation;

    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => navigate('Details', {name: item.name})}
        style={{height: 70, borderColor: '#841584', borderWidth: 1, alignSelf: "stretch"}}>
        <Text> {item.name} </Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View>
        <View>
          <Text>
            List of Challenges
          </Text>
        </View>
        <FlatList
          data={this.state.challenges}
          renderItem={(obj) => this.renderChallenge(obj)}
        />
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
