import * as firebase from 'firebase';
import React, {Component} from 'react';
import moment from 'moment';
import * as actions from '../actions/firebase_actions';
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
    this.today = moment();
    this.begDate = moment(this.data.startDate);
    this.endDate = moment(this.data.startDate).add(parseInt(this.data.days), 'days');
    this.dayOfCycle = this.today.diff(this.begDate, 'days');

    this.state = {
      userData: this.data.userData[this.userID]
    };
    console.log("day of cycle", this.dayOfCycle);
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerRight:(
        <View style={{alignSelf: 'stretch', justifyContent: 'space-between', flexDirection: 'row'}}>
          <Text style={{marginLeft: 40, fontSize: 25}}>
            INSERT NAME
          </Text>
          <View>

          </View>
        </View>
      ),
    };
  };

  handleCatSwitch(catObj, idx, bool) {
    this.setState((previousState) => {
      previousState.userData[this.dayOfCycle][idx] = bool;
      return previousState;
    });

    actions.changeChallengeData({
      challengKey: this.challengeKey,
      userID: this.userID,
      dayIdx: this.dayOfCycle,
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
          value={this.state.userData[this.dayOfCycle][index]}
          onValueChange={(bool) => this.handleCatSwitch(item, index, bool)}
          />
      </View>
    );
  }

  renderDateHeader() {

    return (
      <View style={{height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Icon name="chevron-left" size={30} color="#900" />
        </TouchableOpacity>
        <Text style={{fontSize:20, flex: 3}}>
          Today: {this.today.format('ddd, MMMM DD, YYYY')}
        </Text>
        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Icon name="chevron-right" size={30} color="#900" />
        </TouchableOpacity>
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
