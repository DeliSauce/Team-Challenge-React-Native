import * as firebase from 'firebase';
import React, { Component } from 'react';
import {Button} from 'react-native-material-ui';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import store from 'react-native-simple-store';
import merge from 'lodash/merge';
import Contacts from 'react-native-contacts';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', pass: '', authMessage: ''};
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }

  //TODO remove this code -- only for testing purposes
  componentWillMount() {
    // this.login();
    // this.getAuthStatus()
    // if (this.getAuthStatus()) {
    //   this.props.navigation.navigate('MainNav')
    // }
  }

  getContacts() {
    let contactList = [];
    Contacts.getAll((err, contacts) => {
      if(err === 'denied'){
        console.log(err)
      } else {
        console.log('signup getting contacts: ', contacts);
        contacts.forEach((contactObj) => {
          const {givenName, familyName, thumbnailPath, emailAddresses} = contactObj;
          emailAddresses.forEach((emailObj) => {
            const email = emailObj.email;
            const id = 'none';

            // TODO making user email lookup synchronous will probably hold up the main
            // thread. Perhaps Firebase Queue is something worth looking into

            // await firebase.database().ref()
            //   .child('userLookup')
            //   .orderByChild('email')
            //   .equalTo(email);
            //   .once('value', (snap) => {
            //   if (snap.val()) id = Object.keys(snap.val())[0];
            // });

            const idx = contactList.length;
            const contact = {idx, givenName, familyName, thumbnailPath, email, id};
            contactList.push(contact);
          })
        })
        store.save('Contacts', contactList)
      }
    })
  }

  async signup() {
    try {
      const user = await firebase.auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.pass);

      const userInfo = {
        name: user.providerData[0].displayName,
        email: user.providerData[0].email,
        photo: user.providerData[0].photoURL,
        provider: user.providerData[0].providerId,
      }

      this.getContacts();

      // console.log("signup user: ", user);
      store.save('userData', merge({id: user.uid}, userInfo))

      // Code for getting userData from the store
      // store.get('userData')
      //   .then((data) => console.log("data saved: ", data))
      //   .catch((error) => console.log("data not saved: ", error));

      this.props.navigation.navigate('MainNav');
      // AsyncStorage.setItem('userData', JSON.stringify(user.providerData[0]));

      firebaseUpdates = {}
      firebaseUpdates['users/' + user.uid] = userInfo;
      firebaseUpdates['userLookup/' + user.uid] = userInfo;
      firebase.database().ref().update(firebaseUpdates);
    } catch (error) {
        console.log("getting an auth error", error.toString());
        this.setState({authMessage: error.toString()});
    }
  }

  async login() {
    try {
      const user = await firebase.auth()
          .signInWithEmailAndPassword(this.state.email, this.state.pass);
      console.log("log in user: ", user);

      const userInfo = {
        name: user.providerData[0].displayName,
        email: user.providerData[0].email,
        photo: user.providerData[0].photoURL,
        provider: user.providerData[0].providerId,
        id: user.uid,
      }
      store.save('userData', userInfo);

      this.props.navigation.navigate('MainNav');

    } catch (error) {
        console.log("login error", error.toString());
        this.setState({authMessage: error.toString()});
    }
  }

  //onAuthStateChanged is the preferred method for checking current user but
  // I could not get it to work correctly. May require lifecycle methods?
  // firebase.auth().onAuthStateChanged(function(user) {
  // });




  render() {
    console.log("renderLogin");
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to TeamChallenge App
        </Text>
        <Text style={styles.instructions}>
          Enter email and password
        </Text>
        <TextInput
          placeholder={"email address"}
          style={{height: 40, width: 160, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          keyboardType="email-address"
          />
        <TextInput
          placeholder={"password"}
          style={{height: 40, width: 160, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(pass) => this.setState({pass})}
          value={this.state.pass}
          />

        <Text
          style={styles.errors}
          >
          {this.state.authMessage}
        </Text>

        <Button
          primary
          raised
          style={{flex: 1, margin: 10}}
          onPress={() => this.signup()}
          text={'Sign Up'}>
        </Button>

        <Button
          accent
          raised
          onPress={() => this.login()}
          text={'Log In'}>
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
    // backgroundColor: '#F5FCFF',
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
