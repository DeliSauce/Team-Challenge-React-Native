import React, {Component} from 'react';
import * as firebase from 'firebase';

import {
  View,
  Text,
  StyleSheet
} from 'react-native';


export default class DummyTab extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount () {

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('User is signed in.');
        this.props.navigation.navigate('MainNav');
      } else {
        console.log('No user is signed in.');
        this.props.navigation.navigate('Login');
      }
    });

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Dummy Tab
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
    backgroundColor: 'pink',
  }
});
