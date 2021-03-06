import * as firebase from 'firebase';
import firebaseConfig from '../env';
import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import {Navigator} from './components/navigator';
import {ThemeProvider, COLOR} from 'react-native-material-ui';

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class TeamChallenge extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    //TODO remove next line at some point (firebase listener is triggering this -> annoying for debug/dev)
    console.disableYellowBox =['Setting a timer for a long period'];
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
        <Navigator/>
      </ThemeProvider>
    );
  }
}
