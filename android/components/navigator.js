import {Component} from 'react';
import {TabNavigator} from 'react-navigation';
import CurrentChallenges from './current_challenges';
import AddChallenges from './add_challenges';
import Main from './main';
import TestTab from './test_tab';

export const Navigator = TabNavigator({
  'Test Tab': {
    screen: TestTab,
  },
  'Current Challenges': {
    screen: CurrentChallenges,
  },
  'Add Challenges': {
    screen: AddChallenges,
  },
});
