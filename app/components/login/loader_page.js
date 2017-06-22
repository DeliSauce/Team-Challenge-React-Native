import React, {Component} from 'react';
import * as firebase from 'firebase';
import LoginHeader from './header';

import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import FBSDK, {LoginManager} from 'react-native-fbsdk';
const {
    AccessToken
} = FBSDK;


export default class LoaderPage extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount () {
    // Async call to refresh FB access token
    AccessToken.refreshCurrentAccessTokenAsync()
      .then( (result) => { console.log('permissions: ', result ); } )
      .catch( (error) => {console.log(error);} );

    // // Async task to get current user?
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     console.log('User is signed in.');
    //     this.props.navigation.navigate('MainNav');
    //   } else {
    //     console.log('No user is signed in.');
    //     this.props.navigation.navigate('Login');
    //   }
    // });
    const user = firebase.auth().currentUser;
    if (user) {
      console.log('User is signed in.');
      this.props.navigation.navigate('MainNav');
    } else {
      console.log('No user is signed in.');
      this.props.navigation.navigate('Login');
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <LoginHeader style={{flex: 3}}/>
        <View style={{flex: 6}}/>
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
  },
  header: {
    fontSize: 40,
    alignItems: 'center',
    fontWeight: 'bold',
  }
});
