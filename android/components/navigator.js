import React, {Component} from 'react';
import {TabNavigator, StackNavigator, DrawerNavigator, DrawerItems} from 'react-navigation';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLOR} from 'react-native-material-ui';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

//nav components
import AllChallenges from './drawer_items/challenges_list';
import CreateChallenges from './drawer_items/create_challenge';
import AccountDetails from './drawer_items/user_account_details';
import ChallengeDataEntry from './current_challenge/data_entry';
import ChallengeOverview from './current_challenge/overview';
import ChallengeStandings from './current_challenge/standings';
import Login from './login/login';
import LoaderPage from './login/loader_page';

export const DetailsTabs = TabNavigator({
  'Enter Data': {
    screen: ChallengeDataEntry,
  },
  'Overview': {
    screen: ChallengeOverview,
  },
  'Standings': {
    screen: ChallengeStandings,
  }
});

export const ChallengesStack = StackNavigator({
  Challenges: {
    screen: AllChallenges,
  },
  Details: {
    screen: DetailsTabs,
  }
});

export const MainNav = DrawerNavigator({
  'My Challenges': {
    screen: ChallengesStack,
  },
  'Create New Challenge': {
    screen: CreateChallenges,
  },
  'Account Info': {
    screen: AccountDetails
  },
},
{
  drawerWidth: 300,
  contentComponent: props => {

    //TODO add Image if there is one (easier when Redux has been implemented)
    // <Image style={{resizeMode: 'contain', flex: 1}} source={{uri: item.thumbnailPath}} />

    return (
      <View style={{flex:1}}>
        <TouchableOpacity
          style={styles.drawer_header}
          onPress={() => {props.navigation.navigate('Account Info');}}>
          <IconFontAwesome name="user-circle" size={50} color='black' />
          <Text> User name goes here </Text>
        </TouchableOpacity>

        <DrawerItems {...props} />
      </View>
    );
  },
  contentOptions: {
    activeTintColor: COLOR.grey700,
    inactiveTintColor: COLOR.grey700,
    activeBackgroundColor: 'white',
    inactiveBackgroundColor: 'white',

    style: {
      backgroundColor: 'white',
      flex: 1,
    },
    labelStyle: {
      marginVertical: 10,
      fontSize: 18,
    }
  },
  drawerPosition: 'left',
});

export const App = StackNavigator({
  'LoaderPage': { screen: LoaderPage },
  'Login': { screen: Login },
  'MainNav': { screen: MainNav }
},
{
  headerMode: 'none'
});

const styles = StyleSheet.create({
  drawer_header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 100,
    backgroundColor: COLOR.blue200,
  },
});
