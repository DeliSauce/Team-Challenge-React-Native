import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import store from 'react-native-simple-store';
import {Button, Toolbar} from 'react-native-material-ui';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
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
        <IconMaterial name="info-outline" size={25} color={tintColor} />
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


  profilePhoto() {
    console.log(this.state.photo);
    if (this.state.photo) {
      return (<Image style={{width: 140, height: 140, borderRadius: 70}} source={{uri: this.state.photo}} />);
    } else {
      return (<IconFontAwesome name="user-circle" size={140} color='black' />);
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
        <View style={{margin: 10, flexDirection: 'column', justifyContent: 'space-between', height: 300, width: 400}}>

          {this.profilePhoto()}

          <Text style={{fontSize: 20}}> Name: {this.state.name ? this.state.name : "n/a"} </Text>

          <Text style={{fontSize: 20}}> Email: {this.state.email ? this.state.email : "n/a"} </Text>

          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button
              style={{container: {width: 100, height: 50}}}
              accent
              raised
              text='Log Out'
              onPress={() => this.logout()}>
            </Button>
          </View>
        </View>
      </View>
    );
  }

}
