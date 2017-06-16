import * as firebase from 'firebase';
import React, { Component } from 'react';
import {Button} from 'react-native-material-ui';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import store from 'react-native-simple-store';
import merge from 'lodash/merge';
import Contacts from 'react-native-contacts';
import LoginHeader from './header';
import {COLOR} from 'react-native-material-ui';
// import FBSDK, {LoginManager} from 'react-native-fbsdk';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {email: 'pjdelfausse@gamil.com', pass: 'password', authMessage: ''};
    // this.state = {email: '', pass: '', authMessage: ''};
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

  //NOT CURRENTLY FUNCTIONING
  facebookAuth() {
    Alert.alert("Facebook Login", 'Not currently functioning.');
  }

  //NOT CURRENTLY FUNCTIONING
  googleAuth() {
    // const provider = new firebase.auth.GoogleAuthProvider();
    // const token = '99575308379-vhlb8ppp3i683g0ldvq7rqkt4adhma25.apps.googleusercontent.com';
    // var credential = firebase.auth.GoogleAuthProvider.credential(
    //           googleUser.getAuthResponse().id_token);
    // const credential = provider.credential(token);
    //
    // firebase.auth().signInWithCredential(credential).then(function(result) {
    //   console.log('success!!!!', result);
    //   // This gives you a Google Access Token. You can use it to access the Google API.
    //   // var token = result.credential.accessToken;
    //   // The signed-in user info.
    //   var user = result.user;
    //   // ...
    // }).catch(function(error) {
    //   console.log('failure!!!!', error);
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // The email of the user's account used.
    //   var email = error.email;
    //   // The firebase.auth.AuthCredential type that was used.
    //   var credential = error.credential;
    //   // ...
    // });
  }


  render() {
    console.log("renderLogin");
    return (
      <View style={styles.container}>
        <LoginHeader/>
        <Text style={styles.instructions}>
          Don't forget to add a photo and user id/name in account settings so that you can be more easily identifiable!!!
        </Text>
        <TextInput
          placeholder={"email address"}
          style={styles.text_input}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          keyboardType="email-address"
          />
        <TextInput
          placeholder={"password"}
          style={styles.text_input}
          onChangeText={(pass) => this.setState({pass})}
          value={this.state.pass}
          />

        <Text style={styles.errors}>
          {this.state.authMessage}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Button
            primary
            raised
            upperCase={false}
            style={{container: {margin: 10, height: 50, width: 100}, text: {textAlign: 'center', color: 'white', fontSize: 18, }}}

            onPress={() => this.signup()}
            text={'Sign Up'}>
          </Button>

          <Button
            accent
            raised
            upperCase={false}
            style={{container: {margin: 10, height: 50, width: 100}, text: {textAlign: 'center', color: 'white', fontSize: 18, }}}

            onPress={() => this.login()}
            text={'Log In'}>
          </Button>
        </View>

        <Button
          raised
          upperCase={false}
          style={{container: {backgroundColor: COLOR.blue500, margin: 10, height: 50, width: '80%'}, text: {textAlign: 'center', color: 'white', fontSize: 18, }}}

          onPress={() => this.facebookAuth()}
          text={'Sign up with Facebook Account'}>
        </Button>

      </View>
    );
  }
}
//
// <Button
//   accent
//   raised
//   upperCase={false}
//   style={{container: {margin: 10, height: 50, width: '80%'}, text: {textAlign: 'center', color: 'white', fontSize: 18, }}}
//
//   onPress={() => this.googleAuth()}
//   text={'Sign up with Google Account'}>
// </Button>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.blue200,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    fontSize: 17,
    color: '#333333',
    marginBottom: 5,
  },
  text_input: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: 40,
    width: 260,
    marginBottom: 5,
    marginTop: 5,
    borderColor: 'gray',
    borderWidth: 1,
  },
  errors: {
    textAlign: 'center',
    alignSelf: "stretch",
    color: 'red',
  }
});
