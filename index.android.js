import * as firebase from 'firebase';
import firebaseConfig from './env';
import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import {App} from './android/components/navigator';
import {ThemeProvider, COLOR} from 'react-native-material-ui';

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class TeamChallenge extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    const uiTheme = {
      // palette is lightTheme by default but can override values
      palette: {
        primaryColor: COLOR.green500,
        accentColor: COLOR.red500,
      },
      toolbar: {
        container: {
          height: 60
        },
      },
      action: {},
      card: {},
      button: {}
    };

    return (
      <ThemeProvider uiTheme={uiTheme}>
        <App/>
      </ThemeProvider>
    );
  }
}

AppRegistry.registerComponent('TeamChallenge', () => TeamChallenge);
