import React, {Component} from 'react';
import * as firebase from 'firebase';

import {
  View,
  Text,
  StyleSheet
} from 'react-native';


export default class LoaderPage extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount () {
    //This does not require connection, looks for session token stored
    //locally?
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
        <Text style={{fontSize: 20, margin: 10}}>
          Currenty Determining Your Log In Status.
         </Text>
        <Text style={{fontSize: 20, margin: 10}}>
          Please Hold.
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
    backgroundColor: 'lightgray',
  }
});
