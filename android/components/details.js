import * as firebase from 'firebase';
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';


export default class Details extends Component {

  render() {
    const {params} = this.props.navigation.state;
    return (
      <View >
        <Text>
          {params.name}
         </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
