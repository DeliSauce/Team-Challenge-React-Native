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
    this.challengeData = this.props.navigation.state.params.challengeData;
    this.userID = this.props.navigation.state.params.userID;
    this.challengeKey = this.props.navigation.state.params.challengeKey;

    // this.myData = this.challengeData.userData[this.userID];
    this.numDays = this.challengeData.days;
    this.numCats = this.challengeData.categories.length;
    console.log('CONSTRUCTOR: overview');

    this.state = {
      boxSize: 60,
      myData: this.challengeData.userData[this.userID]
    };
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
    console.log('WILL MOUNT: overview');
    this.listenForUpdatesToChallenge();
  }

  listenForUpdatesToChallenge() {
    const challengeData = firebase.database().ref('challenges/' + this.challengeKey + '/userData/' + this.userID);
    challengeData.on('value', (snap) => {
      // this.props.navigation.setParams({challengeData: snap.val()});
      this.setState({myData: snap.val()});
    });
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log("OVERVIEWcomponentWillReceiveProps: ", nextProps);
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log("OVEWVIEWcomponentDidUpdate: ", this.props, prevProps);
  //   if (this.props != prevProps) {
  //     this.setState(this.props);
  //   }
  // }



  renderOverviewMatrix(numRows, numCols){
    const board = [];
    for(let i = 0; i < numRows; i++) {
      board.push(
        <MatrixRow
          key={i}
          row={i}
          numCols={numCols}
          rowData={this.state.myData[i]}
          boxSize={this.state.boxSize}/>
      );
    }
    return (board);
  }

  render() {
    console.log('RENDER: overview');
    return (
      <View
        style={styles.container}
        onLayout={(event) => {
          const boxSize = (event.nativeEvent.layout.width - 20)/ (this.numCats + 1);
          if (boxSize < this.state.boxSize) this.setState({boxSize});
        }}
      >
        <HeaderComponent categories={this.challengeData.categories} boxSize={this.state.boxSize}/>
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
    padding: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
