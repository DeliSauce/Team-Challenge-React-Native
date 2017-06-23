import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLOR} from 'react-native-material-ui';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {DrawerItems} from 'react-navigation';
import store from 'react-native-simple-store';


export default class DrawerComponent extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    store.get('userData')
      .then((userData) => {
        this.setState(userData);
      })
      .catch((error) => console.log("errors with data", error));
  }

  profilePhoto() {
    if (this.state.photo) {
      return (<Image style={{width: 50, height: 50, borderRadius: 25}} source={{uri: this.state.photo}} />);
    } else {
      return (<IconFontAwesome name="user-circle" size={50} color='black' />);
    }
  }

  userInfo() {
    if (this.state.name) {
      return (
        <View style={{flexDirection: 'column'}}>
          <Text> {this.state.name} </Text>
          <Text> ({this.state.email}) </Text>
        </View>
      );
    } else {
      return (
        <View style={{flexDirection: 'column'}}>
          <Text> {this.state.email} </Text>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={{flex:1}}>
        <TouchableOpacity
        style={styles.drawer_header}
        onPress={() => {this.props.navigation.navigate('Account Info');}}
        >
          {this.profilePhoto()}

          {this.userInfo()}
        </TouchableOpacity>
        <DrawerItems {...this.props}/>

      </View>



    );
  }
}

    //TODO add Image if there is one (easier when Redux has been implemented)
    // <Image style={{resizeMode: 'contain', flex: 1}} source={{uri: item.thumbnailPath}} />


const styles = StyleSheet.create({
  drawer_header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 100,
    backgroundColor: COLOR.blue200,
  },
});


// <View style={{flex:1}}>
// <TouchableOpacity
// style={styles.drawer_header}
// onPress={() => {props.navigation.navigate('Account Info');}}>
// <IconFontAwesome name="user-circle" size={50} color='black' />
// <Text> User name goes here </Text>
// </TouchableOpacity>
//
// <DrawerItems {...props} />
// </View>
