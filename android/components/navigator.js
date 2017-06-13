import {Component} from 'react';
import {TabNavigator, StackNavigator, DrawerNavigator} from 'react-navigation';
import AllChallenges from './drawer_items/challenges_list';
import CreateChallenges from './drawer_items/create_challenge';
import AccountDetails from './drawer_items/user_account_details';
import ChallengeDataEntry from './current_challenge/data_entry';
import ChallengeOverview from './current_challenge/overview';
import ChallengeStandings from './current_challenge/standings';
import Login from './login/login';
import LoaderPage from './login/loader_page';
import {COLOR} from 'react-native-material-ui';


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
      fontSize: 15,
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
