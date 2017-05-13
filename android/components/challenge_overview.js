import * as firebase from 'firebase';
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Button
} from 'react-native';

const HeaderComponent = ({categories}) => {
  const thisRow = [];

  for(let i = 0; i <= categories.length; i++) {
    if (i === 0) {
      thisRow.push(
        <View key={i} style={{width: 90, height: 90}}/>
      );
    } else {
      thisRow.push(
        <View key={i} style={{width: 90, height: 90, justifyContent: 'center', alignItems: 'center'}}>
          <Text> {"Cat: " + i} </Text>
        </View>
      );
    }
  }
  return (
    <View style={{flexDirection: 'row'}}>
      {thisRow}
    </View>
  );
};

const RowComponent = ({row, numCols, boxSize}) => {
  const thisRow = [];
  let day = row + 1;

  for(let i = 0; i <= numCols; i++) {
    if (i === 0) {
      thisRow.push(
        <View key={row+"_"+i} style={{width: boxSize, height: boxSize, justifyContent: 'center', alignItems: 'center'}}>
          <Text> {"Day: " + day} </Text>
        </View>
      );
    } else {
      thisRow.push(
        <View key={row+"_"+i} style={{width: boxSize, height: boxSize, borderWidth: 1, borderColor: 'blue'}}/>
      );
    }
  }

  return (
    <View style={{flexDirection: 'row'}}>
      {thisRow}
    </View>
  );
};

export default class ChallengeOverview extends Component {
  constructor(props) {
    super(props);
    this.data = this.props.navigation.state.params.challengeData;
    this.TEST_DATA = {
      days: 12,
      cats: 7
    };
    this.days = this.data.days;
    this.cats = this.data.categories.length;
    this.state = {

    };
  }

  renderBoardViaComponent(numRows, numCols){
    console.log('dataset: ', this.data);
    const board = [];
    for(let i = 0; i <= numRows; i++) {
      board.push(
        <RowComponent row={i} numCols={numCols} rowData={1} boxSize={90}/>
      );
    }
    return (board);
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderComponent categories={this.data.categories}/>
        <ScrollView>
          {this.renderBoardViaComponent(this.days, this.cats)}
        </ScrollView>
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
