import {Component} from 'react';
import {TabNavigator, StackNavigator, DrawerNavigator} from 'react-navigation';
import AllChallenges from './all_challenges';
import AddChallenges from './add_challenges';
import ChallengeDataEntry from './challenge_data_entry';
import ChallengeOverview from './challenge_overview';
import ChallengeStandings from './challenge_standings';
import AccountInfo from './account';
import Login from './login';
import DummyTab from './dummy';
import TestMUI from './test_mui';

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
    screen: AddChallenges,
  },
  'Account Info': {
    screen: AccountInfo
  },
  'TEST MATERIAL UI': {
    screen: TestMUI,
  },
},
{
  drawerWidth: 300,
  contentOptions: {
    activeTintColor: 'red',
    inactiveTintColor: 'black',
    activeBackgroundColor: 'white',
    inactiveBackgroundColor: 'white',

    style: {
      backgroundColor: 'white',
      flex: 1,
    },
    labelStyle: {
      marginVertical: 10,
      fontSize: 20,
    }
  },
  drawerPosition: 'left',
});

export const App = StackNavigator({
  'Dummy': { screen: DummyTab },
  'Login': { screen: Login },
  'MainNav': { screen: MainNav }
},
{
  headerMode: 'none'
});
