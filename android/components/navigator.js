import {Component} from 'react';
import {TabNavigator} from 'react-navigation';
import Challenges from './challenges';
import Main from './main';
import TestTab from './test_tab';

export const Navigator = TabNavigator({
  TestTab: {
    screen: TestTab,
  },
  Challenges: {
    screen: Challenges,
  },
});
