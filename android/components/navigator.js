import {Component} from 'react';
import {TabNavigator, StackNavigator, DrawerNavigator} from 'react-navigation';
import CurrentChallenges from './current_challenges';
import AddChallenges from './add_challenges';
// import Main from './main';
// import TestTab from './test_tab';
import Details from './details';
import DataEntry from './data_entry';
import ChallengeResults from './challenge_results';

export const DetailsTabs = TabNavigator({
  'Enter Data': {
    screen: DataEntry,
  },
  'Results': {
    screen: ChallengeResults,
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
  'Home': {
    screen: ChallengeStack,
  },
  'Add': {
    screen: AddChallenges,
  },
},
{
  drawerWidth: 150,
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
