import * as firebase from 'firebase';
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';


export default class ChallengeStandings extends Component {
  constructor(props) {
    super(props);
    this.data = this.props.navigation.state.params.challengeData;
    this.userID = this.props.navigation.state.params.userID;
    this.challengeKey = this.props.navigation.state.params.challengeKey;

    this.userData = this.props.navigation.state.params.challengeData.userData[this.userID];
    this.users = this.props.navigation.state.params.challengeData.users;
    this.state = {};
  }


  // calculateTotals() {
  //   const leaderBoard = this.users.map((userObj) => {
  //     const id = userObj.id;
  //     const dataMatrix = this.data.userData[id];
  //     const numCats = dataMatrix[0].length;
  //     const numDays = dataMatrix.length;
  //     let catCount = Array(numCats).fill(0);
  //     for(let i = 0; i < numDays; i++) {
  //       dataMatrix[i].forEach((bool, idx) => {if (bool) catCount[idx]++;});
  //     }
  //     return {email: userObj.email, catCount};
  //   });
  //
  //   console.log("cal totals, leaderBoard: ", leaderBoard);
  //   this.setState(leaderBoard);
  // }

  componentWillMount() {
    this.listenForUpdatesToChallenge();
  }

  listenForUpdatesToChallenge() {
    const challengeData = firebase.database().ref('challenges/' + this.challengeKey + '/userData');
    challengeData.on('value', (snap) => {
      console.log("mydata value changed", snap.val());
      this.setState({challengeData: snap.val()});
    });
  }

  renderLeaderBoard () {
    if (this.state.challengeData === undefined) return;

    const leaderBoard = this.users.map((userObj) => {
      const id = userObj.id;
      const dataMatrix = this.state.challengeData[id];
      const numCats = dataMatrix[0].length;
      const numDays = dataMatrix.length;
      let catCount = Array(numCats).fill(0);
      for(let i = 0; i < numDays; i++) {
        dataMatrix[i].forEach((bool, idx) => {if (bool) catCount[idx]++;});
      }
      return {email: userObj.email, catCount};
    });


    const listOfUsers = leaderBoard.map((userObj) => {
      return (
        <Text>
          {userObj.email} with {userObj.catCount.reduce((sum, x) => sum + x)} total points
        </Text>
      );
    });

    return (
      <View style={{borderWidth: 1, borderColor: 'black'}}>
        {listOfUsers}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>LeaderBoard</Text>
          {this.renderLeaderBoard()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
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
