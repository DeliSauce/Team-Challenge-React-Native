import * as firebase from 'firebase';
import React, {Component} from 'react';
import * as actions from '../actions/firebase_actions';

import {
  Button,
  TouchableOpacity,
  ListView,
  View,
  Text,
  StyleSheet
} from 'react-native';

export default class CurrentChallenges extends Component {
  constructor(props) {
    super(props);
    this.state = {challenges: this.getChallenges()};
    // this.state = {dataSource: '', challenges: []};
  }

  getChallenges() {
    // const challenges = [];
    // const userID = firebase.auth().currentUser.uid;
    // const challengesRef = firebase.database().ref('users/' + userID + '/challenges');
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
    this.listenForItems();
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
    const {navigate} = this.props.navigation;
    return (
      <View>
        <Button
          onPress={() => navigate('Details', {name: 'Test Challenge Details'})}
          title={'TEMP - Get Challenge details'}>
        </Button>
      </View>
    );
  }
}
// <ListView
//   dataSource={this.state.dataSource}
//   renderRow={(rowData) => <Text>{rowData}</Text>}
//   />


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
