import {Component} from 'react';
import {TabNavigator, StackNavigator} from 'react-navigation';
import CurrentChallenges from './current_challenges';
import AddChallenges from './add_challenges';
import Main from './main';
import TestTab from './test_tab';
import Details from './details';

export const ChallengeStack = StackNavigator({
  Challenges: {
    screen: CurrentChallenges,
  },
  Details: {
    screen: Details,
  }
});

export const Tabs = TabNavigator({
  'Test Tab': {
    screen: TestTab,
  },
  'Challenges': {
    screen: ChallengeStack,
  },
  'Add Challenges': {
    screen: AddChallenges,
  },
});
