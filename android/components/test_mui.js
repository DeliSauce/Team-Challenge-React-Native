import * as firebase from 'firebase';
import React, {Component} from 'react';
import * as MUI from 'react-native-material-ui';

import {
  View,
  Text,
  StyleSheet
} from 'react-native';


// Action Button
// Avatar
// Badge
// Bottom Navigation
// Button
// Card
// Checkbox
// Dialog
// Divider
// Drawer
// Icon
// Icon toggles
// List item
// Radio button
// Subheader
// Toolbar



export default class TestMUI extends Component {

  // <MUI.Checkbox checked value='hello'></MUI.Checkbox >
  // <MUI.RadioButton checked ></MUI.RadioButton >
  render() {
    return (
      <View style={styles.container}>



        <Text>
          Test Tab
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
