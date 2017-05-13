import {Component} from 'react';
import {TabNavigator, StackNavigator, DrawerNavigator} from 'react-navigation';
import CurrentChallenges from './current_challenges';
import AddChallenges from './add_challenges';
// import Main from './main';
// import TestTab from './test_tab';
// import Details from './details';
import ChallengeDataEntry from './challenge_data_entry';
import ChallengeOverview from './challenge_overview';
import ChallengeStandings from './challenge_standings';

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

export const ChallengeStack = StackNavigator({
  Challenges: {
    screen: CurrentChallenges,
  },
  Details: {
    screen: DetailsTabs,
  }
});

export const MainNav = DrawerNavigator({
  'My Challenges': {
    screen: ChallengeStack,
  },
  'Add New Challenge': {
    screen: AddChallenges,
  },
},
{
  drawerWidth: 200,
  contentOptions: {
    activeTintColor: '#e91e63',
    activeBackgroundColor: 'blue',
    inactiveTintColor: 'black',
    inactiveBackgroundColor: 'white',
    style: {
      marginVertical: 0,
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
