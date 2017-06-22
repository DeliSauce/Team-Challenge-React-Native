import * as firebase from 'firebase';
import React, {Component} from 'react';
import moment from 'moment';
import * as actions from '../../actions/firebase_actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'react-native-material-ui';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Switch
} from 'react-native';

export default class ChallengeDataEntry extends Component {
  constructor(props) {
    super(props);
    this.data = this.props.navigation.state.params.challengeData;
    this.userID = this.props.navigation.state.params.userID;
    this.challengeKey = this.props.navigation.state.params.challengeKey;

    this.categories = this.data.categories;
    this.today = moment().startOf('day');
    this.begDate = moment(this.data.startDate).startOf('day');
    this.endDate = moment(this.data.startDate).add(parseInt(this.data.days), 'days');

    this.state = {
      userData: this.data.userData[this.userID],
      dayOfCycle: this.today.diff(this.begDate, 'days')
    };

    // console.log("day of cycle", this.dayOfCycle);
    // console.log(this.data);
  }

  handleCatSwitch(catObj, idx, bool) {
    this.setState((previousState) => {
      previousState.userData[this.state.dayOfCycle][idx] = bool;
      return previousState;
    });

    actions.changeChallengeData({
      challengKey: this.challengeKey,
      userID: this.userID,
      dayIdx: this.state.dayOfCycle,
      catIdx: idx,
      boolVal: bool});
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
          value={this.state.userData[this.state.dayOfCycle][index]}
          onValueChange={(bool) => this.handleCatSwitch(item, index, bool)}
          />
      </View>
    );
  }

  renderDateChanger(direction) {
    if (direction === 'left' && this.state.dayOfCycle > 0) {
      return (
        <TouchableOpacity
          style={{alignItems: 'center', justifyContent: 'center'}}
          onPress={() => {
            dayOfCycle = this.state.dayOfCycle - 1;
            this.setState({dayOfCycle});
          }}>
          <Icon name="chevron-left" size={30} color="black" />
        </TouchableOpacity>
      )
    } else if (direction === 'right' && this.state.dayOfCycle < this.data.days - 1) {
      return (
        <TouchableOpacity
          style={{alignItems: 'center', justifyContent: 'center'}}
          onPress={() => {
            dayOfCycle = this.state.dayOfCycle + 1;
            this.setState({dayOfCycle});
          }}>
          <Icon name="chevron-right" size={30} color="black" />
        </TouchableOpacity>
      )
    } else {
      return;
    }
  }

  renderDateHeader() {
    // console.log(this.state.dayOfCycle);
    let headerDate =
      moment(this.data.startDate)
      .add(parseInt(this.state.dayOfCycle), 'days');

    let headerDescription =
      this.today.startOf('day')
      .diff(headerDate.startOf('day'), 'days') === 0 ? 'Today: ' : '';

    return (
      <View style={{height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <View style={{flex: 1}}>
          {this.renderDateChanger('left')}
        </View>
        <Text style={{fontSize:20, flex: 3, textAlign: 'center'}}>
          {headerDescription + headerDate.format('dddd, MMMM DD')}
        </Text>
        <View style={{flex: 1}}>
          {this.renderDateChanger('right')}
        </View>
      </View>
    )
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
        {this.renderDateHeader()}
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
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  category_container: {
    height: 80,
    // width: 350,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: "stretch",
    // margin: 10,
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
