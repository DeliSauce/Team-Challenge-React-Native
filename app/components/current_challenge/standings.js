import * as firebase from 'firebase';
import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet
} from 'react-native';


export default class ChallengeStandings extends Component {
  constructor(props) {
    super(props);
    this.challengeData = this.props.navigation.state.params.challengeData;
    this.userID = this.props.navigation.state.params.userID;
    this.challengeKey = this.props.navigation.state.params.challengeKey;

    this.userData = this.challengeData.userData;
    this.competitors = this.challengeData.competitors;
    this.categories = this.challengeData.categories;
    // console.log('CONSTRUCTOR: STANDINGS');
    this.state = {
      leaderBoard: []
    }
  }

  // static navigationOptions = ({navigation}) => {
  //   return {
  //     headerRight:(
  //       <View style={{alignSelf: 'stretch', justifyContent: 'space-between', flexDirection: 'row'}}>
  //         <Text style={{marginRight: 90, fontSize: 25}}>
  //           {navigation.state.params.challengeData.name}
  //         </Text>
  //       </View>
  //     ),
  //   };
  // };

  componentWillMount() {
    // console.log('WILL MOUNT: challenge standings');
    this.listenForUpdatesToChallenge();
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("STANDINGScomponentDidUpdate: ", this.props, prevProps);

    if (this.props != prevProps) {
      this.calculatePoints();
    }
  }

  listenForUpdatesToChallenge() {
    const challengeData = firebase.database().ref('challenges/' + this.challengeKey + '/userData');
    challengeData.on('value', (snap) => {
      // console.log("standings LISTENER", snap.val());
      this.props.navigation.setParams({challengeData: snap.val()});
    });
  }

  calculatePoints() {
    let leaderBoard = this.competitors.map((userObj) => {
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
    this.setState({leaderBoard});
  }

  renderLeaderBoard () {
    const listOfUsers = this.state.leaderBoard.map((userObj) => {
      return (
        <View style={{flexDirection: 'row'}}>
          <Text style={{flex: 5}}>{userObj.email}</Text>
          <Text style={{flex: 1, textAlign: 'center'}}>{userObj.catCount.reduce((sum, x) => sum + x)}</Text>
        </View>
      );
    });

    return (
      <View style={{}}>
        {listOfUsers}
      </View>
    );
  }

  renderCategoryLeaders(idx) {
    // console.log('renderCategoryLeaders', idx, this.state.leaderBoard);
    let listOfUsers = this.state.leaderBoard.map((userObj) => {
      return (
        <View style={{flexDirection: 'row'}} key={userObj.email}>
          <Text style={{flex: 5}}>{userObj.email}</Text>
          <Text style={{flex: 1, textAlign: 'center'}}>{userObj.catCount[idx]}</Text>
        </View>
      );
    });

    return (
      <View style={{flexDirection: 'column'}}>
        {listOfUsers}
      </View>
    );
  }

  renderCategories() {
    let categories = this.categories.map((cat, idx) => {
      return (
        <View style={{marginTop: 30}} key={idx}>
          <Text style={{fontSize: 15, textDecorationLine: 'underline'}}>{cat}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{flex: 5, textDecorationLine: 'underline'}}>User</Text>
            <Text style={{flex: 1, textDecorationLine: 'underline', textAlign: 'center'}}>Points</Text>
          </View>
          {this.renderCategoryLeaders(idx)}
        </View>
      )
    });

    return (
      <View style={{}}>
        {categories}
      </View>
    )
  }


  render() {
    // console.log('RENDER: STANDINGS');

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={{flexDirection: 'column', width: '90%', marginTop: 30}} >
            <Text style={{fontSize: 20, textAlign: 'center'}} >Total Points</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{flex: 5, textDecorationLine: 'underline'}}>User</Text>
              <Text style={{flex: 1, textDecorationLine: 'underline', textAlign: 'center'}}>Points</Text>
            </View>
            {this.renderLeaderBoard()}
          </View>
          <View style={{width: '90%', marginTop: 30}} >
            <Text style={{fontSize: 20, textAlign: 'center'}} >Category Leaders</Text>
            {this.renderCategories()}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
