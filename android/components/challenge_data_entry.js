import * as firebase from 'firebase';
import React, {Component} from 'react';
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
    // this.days = this.data.days;
    // this.cats = this.data.categories.length;
    this.state = {

    };
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
    return (
      <View style={styles.container}>
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
