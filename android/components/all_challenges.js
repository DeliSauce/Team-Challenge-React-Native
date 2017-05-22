import * as firebase from 'firebase';
import React, {Component} from 'react';
import * as actions from '../actions/firebase_actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import {Button} from 'react-native-material-design';
import { COLOR, Button, Toolbar, Card, ActionButton} from 'react-native-material-ui';
import moment from 'moment';

import {
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ListView,
  FlatList,
  View,
  Text,
  StyleSheet
} from 'react-native';


export default class AllChallenges extends Component {
  constructor(props) {
    super(props);
    this.userID = firebase.auth().currentUser.uid;
    this.today = moment();
    this.state = {};
  }

  static navigationOptions = ({navigation}) => {
    //it appears that you can set the icon size about 5 pixels greater than fontSize
    return {
      drawerLabel: 'HOME',
      drawerIcon: ({tintColor}) => (
        <Icon name="home" size={25} color={tintColor} />
      ),
      header: (
        <Toolbar
          leftElement="menu"
          onLeftElementPress={() => navigation.navigate('DrawerOpen')}
          centerElement="My Challenges"
          />
      )
    }



    // return {
    //   headerLeft:(
    //     <View style={{alignSelf: 'stretch', justifyContent: 'space-between', flexDirection: 'row'}}>
    //       <TouchableOpacity
    //         style={{marginLeft: 10}}
    //         onPress={() => navigation.navigate('DrawerOpen')}>
    //         <Icon name="menu" size={40} color="#900" />
    //       </TouchableOpacity>
    //       <Text style={{marginLeft: 40, fontSize: 25}}>
    //         My Challenges
    //       </Text>
    //       <View>
    //
    //       </View>
    //     </View>
    //   ),
    // };
  };

  // getChallenges() {
  //   // const challenges;
  //   const userID = firebase.auth().currentUser.uid;
  //
  //   const challengesRef = firebase.database().ref('users/' + userID + '/challenges');
  //   challengesRef.once('value', (snapshot) => {
  //       console.log("challenges from db", Object.keys(snapshot.val()));
  //       this.setState({challenges: Object.keys(snapshot.val())});
  //     });
  // }

  listenForItems() {
    const challenges = [];
    const myChallengesRef = firebase.database().ref('users/' + this.userID + '/challenges');
    const challengesRef = firebase.database().ref('challenges');

    // challengesRef.on('child_added', (snap) => console.log("chall child added", snap.val()));
    // challengesRef.on('value', (snap) => console.log("chall value", snap.val()));

    myChallengesRef.on('child_added', (snap) => {
      // console.log("chall child added", snap.key);
      const challengeRef = firebase.database().ref('challenges/' + snap.key);
      challengeRef.once('value', (snapshot) => {
        console.log('hit a new challenge ref, snap=', snap.key, 'snapshot=', snapshot.key);
        challenges.push({challengeKey: snapshot.key, challenge: snapshot.val()});
        this.setState({challenges});
      });
    });
  }

  componentDidMount() {
    this.listenForItems();
  }

  renderChallengeItem({item, index}) {
    const {navigate} = this.props.navigation;
    const dateStatus = this.getDateStatus(item.challenge.startDate, item.challenge.days);
    const backgroundColor = (dateStatus < 0 ? 'lightyellow' : COLOR.grey200);

    return (
        <Card
          primary
          onPress={() => {
            console.log('Challenge item touched. Data being passing to view: ', item.challenge);
            navigate('Details', {
              challengeData: item.challenge,
              challengeKey: item.challengeKey,
              userID: this.userID
            })
        }}>
          <View style={[styles.list_item, {backgroundColor: backgroundColor}]}>

            <View style={[styles.list_item_details, {flex: 4, borderWidth: 1, borderColor: 'black'}]}>
              <Text style={{fontSize: 20, textAlign: 'center'}}> {item.challenge.name} </Text>
              <Text style={{fontSize: 15}}> Users: {Object.keys(item.challenge.userData).length} </Text>
              <Text style={{fontSize: 15}}> {item.challenge.startDate} </Text>
              {this.renderDate(dateStatus, item.challenge.days)}
              {this.renderProgressBar(dateStatus, item.challenge.days)}
            </View>

            <View style={{flex: 1, flexDirection: 'column', justifyContent:'center', alignItems: 'center'}}>
              <Icon name="chevron-right" size={30} color="#900" />
            </View>

          </View>
      </Card>
    );
  }
  // <Text> Total Days: {item.challenge.days} </Text>

  renderProgressBar(dateStatus, challengeLength) {

    if (dateStatus <= 0) {
      return (
        <View></View>
      );
    } else {
      const daysLeft = challengeLength - dateStatus;
      return (
        <View style={{
          height: 10,
          flexDirection: 'row',
          backgroundColor: 'lightgray',
          borderBottomLeftRadius: 10,
          borderTopLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderTopRightRadius: 10,
        }}>
          <View style={{
              height: 10,
              flex: dateStatus,
              backgroundColor: 'gray',
              borderBottomLeftRadius: 10,
              borderTopLeftRadius: 10,
              borderBottomRightRadius: 10,
              borderTopRightRadius: 10,}}>
          </View>
          <View style={{flex: daysLeft}}></View>
        </View>
      )
    }
  }
//
  getDateStatus(date, challengeLength) {
    const begDate = moment(date)
    const diff = this.today.diff(begDate, 'days');

    if (diff < 0) {
      return (diff - 1);
    } else if (diff > challengeLength) {
      return (0);
    } else {
      return diff + 1;
    }
  }

  renderDate(dateStatus, days) {
    const plural = (dateStatus === -1 ? '' : 's');
    if (dateStatus === 0) {
      return (
        <Text> This challenge is over.</Text>
      );
    } else if (dateStatus < 0) {
      return (
        <Text> This challenge hasnt started yet. You have {-1 * dateStatus} day{plural} til it starts. </Text>
      );
    } else {
      return (
        <Text> You are on day {dateStatus} of {days}.</Text>
      )
    }
  }


  render() {
    return (
      <View style={styles.container2}>
        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={(item, index) => item.challengeKey}
          data={this.state.challenges}
          renderItem={(obj) => this.renderChallengeItem(obj)}
        />
        <View style={styles.add_container}>
          <ActionButton
            transition='toolbar'
            onPress={() => {this.props.navigation.navigate('Create New Challenge')}}
            />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container2: {
    flex: 1,
    justifyContent: 'space-between',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  list: {
    flexDirection: "column",
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  list_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 110,
    alignSelf: "stretch",
    // flex: 1,
    // backgroundColor: 'gray',

    // justifyContent: 'center',
    // alignItems: 'center',
  },
  list_item_details: {
    flexDirection: 'column',
    // justifyContent: 'space-between',
    // height: 100,
    alignSelf: "stretch",
    // flex: 1,
    // backgroundColor: 'gray',

    // justifyContent: 'center',
    // alignItems: 'center',
  },
  add_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',

    alignItems: 'center',
    // backgroundColor: 'lightblue',
  }

});
