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
      challenges: this.testChallenges,
      getChallenges: this.getChallenges()
    };
    // this.state = {dataSource: '', challenges: []};
  }

  getChallenges() {
    // const challenges = [];
    const userID = firebase.auth().currentUser.uid;
    return firebase.database().ref('users/' + userID + '/challenges');
  }

  listenForItems() {
    const challenges = [];
    const userID = firebase.auth().currentUser.uid;
    const challengesRef = firebase.database().ref('users/' + userID + '/challenges');

    challengesRef.on('value', (snapshot) => {
      snapshot.forEach((child) => {
        challenges.push(child.key);
      });

      // this.setState({
      //   dataSource: this.state.dataSource.cloneWithRows(items)
      // });

      this.setState({challenges});
      console.log("STATE", this.state);
    });

  }

  componentDidMount() {
    // this.listenForItems();
    console.log("get challenges: ", this.state.getChallenges);
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

  // //TODO needs a lot of work; need to test the firebase function; doesn't render anything
  // showChallenges() {
  //   const user = firebase.auth().currentUser;
  //   console.log("show challenges, user: ", user, user.uid);
  //   if (user) {
  //     const userID = user.uid;
  //     const challengesRef = firebase.database().ref('users/' + userID + '/challenges');
  //     console.log("challengesref: ", challengesRef);
  //     challengesRef.on('value', function(snapshot) {
  //       console.log(snapshot.val());
  //     });
  //   }
  //
  //   return (
  //     <ListView
  //       dataSource={this.state.dataSource}
  //       renderRow={(rowData) => <Text>{rowData}</Text>}
  //     />
  //   );
  // }


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
