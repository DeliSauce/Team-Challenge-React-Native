import React, {Component} from 'react';
import {Text, View} from 'react-native';
import store from 'react-native-simple-store';
import {Button, Toolbar} from 'react-native-material-ui';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as firebase from 'firebase';


export default class AccountDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    store.get('userData')
      .then((userData) => {
        console.log(userData);
        this.setState(userData);
        console.log(this.state);
      })
      .catch((error) => console.log("errors with data", error));
  }

  static navigationOptions = ({navigation}) => {
    return {
      drawerLabel: 'Account Details',
      drawerIcon: ({tintColor}) => (
        <Icon name="info-outline" size={25} color={tintColor} />
      )
    }
  };

  async logout() {
    try {
        await firebase.auth().signOut();
        store.save('userData', {})
        this.props.navigation.navigate('LoaderPage');
    } catch (error) {
        console.log(error);
    }
  }

  render() {
    return (
      <View>
        <Toolbar
          leftElement="menu"
          onLeftElementPress={() => this.props.navigation.navigate('DrawerOpen')}
          centerElement="User Account Details"
          style={{flex: 1, alignSelf: 'stretch'}}
          />
        <View style={{flexDirection: 'column', justifyContent: 'space-between', height: 300}}>
          <Text style={{fontSize: 20}}> Name: {this.state.name ? this.state.name : "n/a"} </Text>
          <Text style={{fontSize: 20}}> Email: {this.state.email ? this.state.email : "n/a"} </Text>
          <Text style={{fontSize: 20}}> Photo: {this.state.photo ? this.state.photo : "n/a"} </Text>
          <Text style={{fontSize: 20}}> Provider: {this.state.provider ? this.state.provider : "n/a"} </Text>
          <Button
            accent
            raised
            text='Log Out'
            onPress={() => this.logout()}>
          </Button>
        </View>
      </View>
    );
  }

}
