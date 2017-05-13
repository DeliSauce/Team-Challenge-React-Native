import * as firebase from 'firebase';
import React, {Component} from 'react';
import moment from 'moment';
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
    this.endDate = moment(this.data.startDate).add(this.data.days, 'days');
    // this.days = this.data.days;
    // this.cats = this.data.categories.length;
    this.state = {

    };
    console.log(this.today, this.data.startDate, this.begDate, this.endDate);
  }

  //TODO need to actually get this method working
  handleCatSwitch(catObj, idx, bool) {
    this.setState((previousState) => {
      previousState.categoryOptions[idx].status = bool;
      return previousState;
    });
  }

  //TODO need to actually get this method working
  renderCategories({item, index}) {
    console.log('HIT RENDER CATEGORIES');
    return(
      <View
        style={styles.default}
        key={index}
        >
        <Text style={{fontSize: 20}}> {item} </Text>
        <Switch
          value={false}
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
        <Text style={{fontSize:30}}>Today: {this.today.format('ddd, MMMM Do YYYY')}</Text>
        <FlatList
        data={this.categories}
        extraData={this.state}
        renderItem={catObj => this.renderCategories(catObj)}
        >
        </FlatList>

        <Text>
          Challenge Data Entry
         </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
  },
  default: {
    width: 300,
    fontSize: 20,
    textAlign: 'center',
    alignSelf: "stretch",
    margin: 10,
    backgroundColor: 'grey',
    borderColor: 'skyblue',
    borderWidth: 1
  }
});
