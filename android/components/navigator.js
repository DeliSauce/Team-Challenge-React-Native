import {Component} from 'react';
import {TabNavigator, StackNavigator, DrawerNavigator} from 'react-navigation';
import AllChallenges from './all_challenges';
import AddChallenges from './add_challenges';
// import Main from './main';
// import Details from './details';
import ChallengeDataEntry from './challenge_data_entry';
import ChallengeOverview from './challenge_overview';
import ChallengeStandings from './challenge_standings';
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

export const AddChallengeStack = StackNavigator({
  'Add Challenge': {
    screen: AddChallenges,
  },
  'Dummy Card': {
    screen: DummyTab,
  },

});

export const MainNav = DrawerNavigator({
  'My Challenges': {
    screen: ChallengesStack,
  },
  'Create New Challenge': {
    screen: AddChallengeStack,
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

//
// export const Tabs = TabNavigator({
//   'Challenges': {
//     screen: ChallengeStack,
//   },
//   'Add Challenges': {
//     screen: AddChallenges,
//   },
// });
