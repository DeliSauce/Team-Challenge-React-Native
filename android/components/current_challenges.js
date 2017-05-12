import * as firebase from 'firebase';
import React, {Component} from 'react';
import * as actions from '../actions/firebase_actions';

import {
  Button,
  Image,
  TouchableOpacity,
  ListView,
  FlatList,
  View,
  Text,
  StyleSheet
} from 'react-native';


export default class CurrentChallenges extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    title: 'Home',
    headerTintColor: 'red',
    drawerIcon: () => {
      <Image
        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
      />
    }
  };

  // drawerIcon: ({ tintColor }) => (
  //   <Image
  //     source={require('./chats-icon.png')}
  //     style={[styles.icon, {tintColor: tintColor}]}
  //   />
  // ),

  // getChallenges() {
  //   // const challenges;
  //   const userID = firebase.auth().currentUser.uid;
  //
  //   const challengesRef = firebase.database().ref('users/' + userID + '/challenges');
  //   challengesRef.once('value', (snapshot) => {
  //       console.log("challenges from db", Object.keys(snapshot.val()));
  //       this.setState({challenges: Object.keys(snapshot.val())});
  //     });
  // }

  listenForItems() {
    const challenges = [];
    const userID = firebase.auth().currentUser.uid;
    const myChallengesRef = firebase.database().ref('users/' + userID + '/challenges');
    const challengesRef = firebase.database().ref('challenges');

    // challengesRef.on('child_added', (snap) => console.log("chall child added", snap.val()));
    // challengesRef.on('value', (snap) => console.log("chall value", snap.val()));

    myChallengesRef.on('child_added', (snap) => {
      // console.log("chall child added", snap.key);
      const challengeRef = firebase.database().ref('challenges/' + snap.key);
      challengeRef.once('value', (snapshot) => {
        console.log('hit a new challenge ref');
        challenges.push({id: snapshot.key, challenge: snapshot.val()});
        this.setState({challenges});
      });
    });
  }

  componentDidMount() {
    this.listenForItems();
  }

  renderChallengeItem({item, index}) {
    const {navigate} = this.props.navigation;

    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => navigate('Details', {challengeData: item.challenge})}
        style={{height: 100, borderColor: '#841584', borderWidth: 1, alignSelf: "stretch"}}>
        <Text> Challenge Name: {item.challenge.name} </Text>
        <Text> Categories: {item.challenge.categories.join(", ")} </Text>
        <Text> Start Date: {item.challenge.startDate} </Text>
        <Text> Total Days: {item.challenge.days} </Text>

      </TouchableOpacity>
    );
  }


  render() {
    return (
      <View>



        <Button title={'drawer'} onPress={() => this.props.navigation.navigate('DrawerOpen')}></Button>
        <View>
          <Text style={{justifyContent: 'center', alignSelf: 'stretch'}}>
            List of Challenges
          </Text>
        </View>
        <FlatList
          data={this.state.challenges}
          renderItem={(obj) => this.renderChallengeItem(obj)}
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
