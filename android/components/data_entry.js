import * as firebase from 'firebase';
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native';

const RowComponent = ({row, numCols}) => {
  const thisRow = [];
  for(let i = 0; i < numCols; i++) {
    thisRow.push(
      <View key={row+"_"+i} style={{width: 30, height: 30, borderWidth: 1, borderColor: 'blue'}}></View>
    );
  }
  return (
    <View style={{flexDirection: 'row'}}>
      {thisRow}
    </View>
  );
};

export default class DataEntry extends Component {
  constructor(props) {
    super(props);
    this.data = this.props.navigation.state.params.challengeData;
    this.TEST_DATA = {
      days: 12,
      cats: 7
    };
    this.state = {board: []};
  }

  renderBoardViaComponent(numRows, numCols){
    const board = [];
    for(let i = 0; i < numRows; i++) {
      board.push(
        <RowComponent row={i} numCols={numCols} rowData={1}/>
      );
    }
    return (board);
  }

  render() {
    return (
      <View style={styles.container}>
        <View>

        </View>
        {this.renderBoardViaComponent(this.TEST_DATA.days, this.TEST_DATA.cats)}
        <Text>
          Data Entry
         </Text>
         <Button
           title={'log challenge data to console'}
           onPress={()=> {console.log("challenge data", this.data);}}>

         </Button>
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
