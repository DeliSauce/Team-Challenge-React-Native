import React, {Component} from 'react';
import {TabNavigator, StackNavigator, DrawerNavigator, DrawerItems} from 'react-navigation';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLOR} from 'react-native-material-ui';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

//nav components
import AllChallenges from './drawer_items/challenges_list';
import CreateChallenges from './drawer_items/create_challenge';
import AccountDetails from './drawer_items/user_account_details';
import DrawerComponent from './drawer_items/drawer';
import ChallengeDataEntry from './current_challenge/data_entry';
import ChallengeOverview from './current_challenge/overview';
import ChallengeStandings from './current_challenge/standings';
import Login from './login/login';
import LoaderPage from './login/loader_page';

export const DetailsTabs = TabNavigator({
  'Enter Data': {
    screen: ChallengeDataEntry,
    title: 'enter'

  },
  'Overview': {
    screen: ChallengeOverview,
  },
  'Standings': {
    screen: ChallengeStandings,
  },
},
{
  tabBarPosition: 'top',
  swipeEnabled: true,
  animationEnabled: false,
  lazy: false,
  backBehavior: 'none',
  tabBarOptions: {
    activeTintColor: 'white',
    inactiveTintColor: 'white',
    activeBackgroundColor: COLOR.green300,
    inactiveBackgroundColor: COLOR.green200,
    upperCaseLabel: false,
    labelStyle: {
      fontSize: 15,
    },
    style: {
      //  backgroundColor: 'yellow',
     },
  },
});

export const ChallengesStack = StackNavigator({
  Challenges: {
    screen: AllChallenges,
  },
  Details: {
    screen: DetailsTabs,
    navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.challengeData.name}`,
      headerTitleStyle : {
        textAlign: 'center',
        alignSelf:'center'
      },
      headerStyle: {
        backgroundColor: COLOR.green500,
      }
    }),
  }
},
{
  mode: 'modal'
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
  contentComponent: DrawerComponent,
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

export const Navigator = StackNavigator({
  'LoaderPage': { screen: LoaderPage },
  'Login': { screen: Login },
  'MainNav': { screen: MainNav }
},
{
  mode: 'modal',
  gesturesEnabled: false,
  headerMode: 'none'
});
