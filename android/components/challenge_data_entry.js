import * as firebase from 'firebase';
import React, {Component} from 'react';
import moment from 'moment';
import * as actions from '../actions/firebase_actions';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Switch
} from 'react-native';


export default class ChallengeDataEntry extends Component {
  constructor(props) {
    super(props);
    this.data = this.props.navigation.state.params.challengeData;
    this.categories = this.data.categories;
    this.today = moment();
    this.begDate = moment(this.data.startDate);
    this.endDate = moment(this.data.startDate).add(parseInt(this.data.days), 'days');
    this.dayOfCycle = this.today.diff(this.begDate, 'days');
    // this.days = this.data.days;
    // this.cats = this.data.categories.length;
    this.state = {
      adminUserData: this.data.userData[this.data.adminID]
    };
    console.log("day of cycle", this.dayOfCycle);
  }

  //TODO need to make sure to actually get challengeKey & userID
  handleCatSwitch(catObj, idx, bool) {
    this.setState((previousState) => {
      previousState.adminUserData[idx][this.dayOfCycle] = bool;
      return previousState;
    });

    actions.changeChallengeData({challengKeyUPDATE: '-Kk3DLbPNg_BnAyWyisY', userIDUPDATE: 'ky1CIuRwJsg3CdwRFbnMyRex50p2', dayIdx: this.dayOfCycle, catIdx: idx, boolVal: bool});
  }

  renderCategories({item, index}) {
    console.log('HIT RENDER CATEGORIES');
    return(
      <View
        style={styles.category_container}
        >
        <Text style={styles.category_text}>
          {item}
        </Text>
        <Switch
          style={styles.toggle}
          value={this.state.adminUserData[index][this.dayOfCycle]}
          onValueChange={(bool) => this.handleCatSwitch(item, index, bool)}
          />
      </View>
    );
  }

  render() {
    if (this.today.isBefore(this.begDate)) {
      return (
      <Text> This challenge hasnt started yet.</Text>
      );
    } else if (this.today.isAfter(this.endDate)) {
      return (
        <Text> This challenge is over.</Text>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={{fontSize:30}}>
          Today: {this.today.format('ddd, MMMM Do YYYY')}
        </Text>
        <FlatList
          keyExtractor={(item, index) => item}
          data={this.categories}
          extraData={this.state}
          renderItem={catObj => this.renderCategories(catObj)}>
        </FlatList>
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

  category_container: {
    height: 80,
    width: 350,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    backgroundColor: 'lightgrey',
    borderColor: 'skyblue',
    borderWidth: 1
  },
  category_text: {
    fontSize: 20,
    marginLeft: 15,
  },
  toggle: {
    marginRight: 15,
  },
});
