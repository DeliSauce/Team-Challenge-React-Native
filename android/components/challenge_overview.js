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

const HeaderComponent = ({categories, boxSize}) => {
  const thisRow = [];

  for(let i = 0; i <= categories.length; i++) {
    if (i === 0) {
      thisRow.push(
        <View key={i} style={{width: boxSize, height: boxSize}}/>
      );
    } else {
      thisRow.push(
        <View key={i} style={{width: boxSize, height: boxSize, justifyContent: 'center', alignItems: 'center'}}>
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

const MatrixRow = ({row, numCols, rowData, boxSize}) => {
  const thisRow = [];
  let day = row + 1;
  let fillColor = '';
  for(let i = 0; i <= numCols; i++) {

    if (i === 0) {
      thisRow.push(
        <View key={row+"_"+i} style={{width: boxSize, height: boxSize, justifyContent: 'center', alignItems: 'center'}}>
          <Text> {"Day: " + day} </Text>
        </View>
      );
    } else {
      fillColor = (rowData[i - 1] ? 'red' : 'white');
      thisRow.push(
        <View key={row+"_"+i} style={{width: boxSize, height: boxSize, borderWidth: 1, backgroundColor: fillColor}}/>
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
    this.userID = this.props.navigation.state.params.userID;
    this.userData = this.props.navigation.state.params.challengeData.userData[this.userID];

    this.numDays = this.data.days;
    this.boxSize = 60;
    this.numCats = this.data.categories.length;
    this.state = {};
  }

  // componentWillMount() {
  //   console.log("overview data", this.userData);
  //   console.log("overview data0", this.userData[0]);
  //   console.log("overview data1", this.userData[1]);
  // }

  renderOverviewMatrix(numRows, numCols){
    const board = [];
    for(let i = 0; i < numRows; i++) {
      board.push(
        <MatrixRow
          key={i}
          row={i}
          numCols={numCols}
          rowData={this.userData[i]}
          boxSize={this.boxSize}/>
      );
    }
    return (board);
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderComponent categories={this.data.categories} boxSize={this.boxSize}/>
        <ScrollView>
          {this.renderOverviewMatrix(this.numDays, this.numCats)}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
