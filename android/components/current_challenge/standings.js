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
    this.challengeData = this.props.navigation.state.params.challengeData;
    this.userID = this.props.navigation.state.params.userID;
    this.challengeKey = this.props.navigation.state.params.challengeKey;

    this.userData = this.challengeData.userData;
    this.users = this.challengeData.users;
    console.log('CONSTRUCTOR: standings');
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerRight:(
        <View style={{alignSelf: 'stretch', justifyContent: 'space-between', flexDirection: 'row'}}>
          <Text style={{marginRight: 90, fontSize: 25}}>
            {navigation.state.params.challengeData.name}
          </Text>
        </View>
      ),
    };
  };

  componentWillMount() {
    console.log('WILL MOUNT: challenge standings');
    this.listenForUpdatesToChallenge();
  }

  listenForUpdatesToChallenge() {
    const challengeData = firebase.database().ref('challenges/' + this.challengeKey + '/userData');
    challengeData.on('value', (snap) => {
      console.log("standings LISTENER", snap.val());
      this.props.navigation.setParams({challengeData: snap.val()});
    });
  }

  renderLeaderBoard () {
    // if (this.state.challengeData === undefined) return;

    const leaderBoard = this.users.map((userObj) => {
      const id = userObj.id;
      const dataMatrix = this.userData[id];
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
      <View style={{}}>
        {listOfUsers}
      </View>
    );
  }

  render() {
    console.log('RENDER: challenge standings');

    return (
      <View style={styles.container}>
        <View style={{borderWidth: 1, borderColor: 'black'}} >
          <Text style={{fontSize:20}} >LeaderBoard</Text>
          {this.renderLeaderBoard()}
        </View>
        <View style={{borderWidth: 1, borderColor: 'black'}} >
          <Text style={{fontSize:20}} >Category Leaders</Text>
          {}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'lightgray',
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
