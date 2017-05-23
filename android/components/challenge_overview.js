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
    this.challengeKey = this.props.navigation.state.params.challengeKey;

    this.numDays = this.data.days;
    this.boxSize = 60;
    this.numCats = this.data.categories.length;
    this.state = {};
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
    this.listenForUpdatesToChallenge();
  }

  listenForUpdatesToChallenge() {
    const myData = firebase.database().ref('challenges/' + this.challengeKey + '/userData/' + this.userID);
    myData.on('value', (snap) => {
      console.log("mydata value changed", snap.val());
      this.setState({myData: snap.val()});
    });
  }
  // componentWillReceiveProps(nextProps) {
  //   console.log("componentWillReceiveProps: ", nextProps);
  // }


  renderOverviewMatrix(numRows, numCols){
    if (this.state.myData === undefined) return;
    const board = [];
    for(let i = 0; i < numRows; i++) {
      board.push(
        <MatrixRow
          key={i}
          row={i}
          numCols={numCols}
          rowData={this.state.myData[i]}
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
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
