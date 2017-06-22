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
import FBSDK, {LoginManager} from 'react-native-fbsdk';
const {
    AccessToken
} = FBSDK;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'pjdelfausse@gamil.com',
      pass: 'password',
      authMessage: '',
      FBSignedUp: false
    };
    // this.state = {email: '', pass: '', authMessage: '', FBSignedUp: false};
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }

  componentWillMount() {
    // Async call to refresh FB access token status. Necessary if user removes
    // app from facebook recognized apps, as user would otherwise get an oauth error
    // declaring "user has not authorized application"
    // AccessToken.refreshCurrentAccessTokenAsync()
    //   .then( (result) => { console.log('permissions: ', result ) } )
    //   .catch( (error) => {console.log(error);} );
    // AccessToken.setCurrentAccessToken(null);
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

  //TODO add permissions??
  // console.log(result.grantedPermissions.toString());

  save_UserInfo_To_Store_And_Firebase (user) {
    const userInfo = {
      name: user.providerData[0].displayName,
      email: user.providerData[0].email,
      photo: user.providerData[0].photoURL,
      provider: user.providerData[0].providerId,
      id: user.uid
    };
    store.save('userData', userInfo);
    firebaseUpdates = {}
    firebaseUpdates['users/' + user.uid] = userInfo;
    firebaseUpdates['userLookup/' + user.uid] = userInfo;
    firebase.database().ref().update(firebaseUpdates);
  }

  facebookAuth() {
    console.log('hit the facebookAuth');
    //FB AccessToken.getCurrentAccessToken() getter for application's current token
    AccessToken.getCurrentAccessToken()
      .then((data) => {
        console.log('getCurrentAccessToken', data);
        if (data === null) {
          console.log('data === null');
          this.facebookSignUp();
        } else {
          this.facebookLogIn(data.accessToken);
        }
      })
      .catch((error) => {console.log('getCurrentAccessToken error: ', error);})

  }

  facebookSignUp() {
    //FB LoginManager allows user to confirm auth permissions
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
    .then((result) => {
      if (result.isCancelled) {
        console.log('log in was cancelled' + result);
      } else {
        this.facebookLogIn();
      }
    })
    .catch((error) => {
      console.log('was an error' + error);
    })
  }

  facebookLogIn(accessToken) {
    // console.log('FB accessToken: ' + accessToken)

    var credential = new firebase.auth.FacebookAuthProvider.credential(accessToken);
    // console.log('FB credential: ' + credential)

    firebase.auth().signInWithCredential(credential)
      .then((user) => {
        console.log('success!!!!', user);
        this.save_UserInfo_To_Store_And_Firebase(user);
        this.props.navigation.navigate('MainNav');
      })
      .catch((error) => {
        console.log('firebase signInWithCredential error', error);
        AccessToken.refreshCurrentAccessTokenAsync(this.facebookAuth);
      })
  }

  // facebookAuth2() {
  //   AccessToken.getCurrentAccessToken().then((data) => {
  //     let accessToken = data.accessToken
  //     console.log('FB accessToken: ' + accessToken)
  //
  //     var credential = new firebase.auth.FacebookAuthProvider.credential(accessToken);
  //     console.log('FB credential: ' + credential)
  //
  //     firebase.auth().signInWithCredential(credential)
  //       .then((user) => {
  //         console.log('success!!!!', user);
  //         const userInfo = {
  //           name: user.providerData[0].displayName,
  //           email: user.providerData[0].email,
  //           photo: user.providerData[0].photoURL,
  //           provider: user.providerData[0].providerId,
  //           id: user.uid}
  //
  //         store.save('userData', userInfo);
  //
  //         this.props.navigation.navigate('MainNav');
  //
  //         firebaseUpdates = {}
  //         firebaseUpdates['users/' + user.uid] = userInfo;
  //         firebaseUpdates['userLookup/' + user.uid] = userInfo;
  //         firebase.database().ref().update(firebaseUpdates);
  //
  //         })
  //       .catch((error) => {
  //         console.log('have not set permission yet', error);
  //         LoginManager.logInWithReadPermissions(['public_profile', 'email'])
  //           .then((result) => {
  //             if (result.isCancelled) {
  //               console.log('log in was cancelled' + result);
  //             } else {
  //
  //             }
  //
  //           }, function(error) {
  //             console.log('was an error' + error);
  //           })
  //         })
  //   })
  // }

  // firebase.auth().signInWithCredential(credential).then(function(result) {
  //   console.log('success!!!!', result);
  //
  //   // This gives you a Google Access Token. You can use it to access the Google API.
  //   var token = result.credential.accessToken;
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
        <LoginHeader style={{flex: 3}}/>
        <View style={[styles.container, {flex: 6}]}>
          <Text style={styles.instructions}>
            Sign in with an email/password or via facebook.
          </Text>
          <View>
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
          </View>

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
    flexDirection: 'column',
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
    height: 50,
    width: 260,
    paddingLeft: 10,
    marginBottom: 5,
    marginTop: 5,
    borderColor: 'gray',
    borderWidth: 1,
  },
  errors: {
    textAlign: 'center',
    // alignSelf: "stretch",
    color: 'red',
  }
});
