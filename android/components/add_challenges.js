import * as firebase from 'firebase';
import React, {Component} from 'react';
import * as actions from '../actions/firebase_actions';
import merge from 'lodash/merge';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Toolbar } from 'react-native-material-ui';

import {
  Button,
} from 'react-native-material-design';

import {
  Slider,
  Picker,
  FlatList,
  TouchableOpacity,
  View,
  Modal,
  Text,
  TextInput,
  StyleSheet,
  Switch
} from 'react-native';

export default class AddChallenges extends Component {
  constructor(props) {
    super(props);
    this.userID = firebase.auth().currentUser.uid;
    // this.defaultCategories = [{'pushups': false}, {'walk': true}];
    this.defaultCategories = [
      {name: 'Walk to work.', status: false},
      {name: 'Don\'t eat carbs.', status: false},
      {name: 'Don\'t eat candy.', status: false},
      {name: 'Read a book.', status: false},
      {name: 'Do 30 pushups.', status: false}
    ];

    this.defaultChallenge = {
      startDate: '2017-05-10',
      days: '10',
      adminID: this.userID,
      users: [this.userID],
      categoryOptions: this.defaultCategories,
      categories: []
    };

    this.otherProperties = {
      name: '',
      categoriesModalVisible: false,
      usersModalVisible: false,
      userSearch: '',
      userSearchResults: [{id: '', email: ''}],
      TESTswitch: [false, true],
      TESTcat: ['Trun', 'Tpushups']
    };

    this.state = merge({}, this.defaultChallenge, this.otherProperties);
  }

  static navigationOptions = ({navigation}) => {
    //it appears that you can set the icon size about 5 pixels greater than fontSize
    return {
      drawerLabel: 'Create Challenge',
      drawerIcon: ({tintColor}) => (
        <Icon name="playlist-add" size={25} color={tintColor} />
      ),
      header: (
        <Toolbar
          leftElement="menu"
          onLeftElementPress={() => navigation.navigate('DrawerOpen')}
          centerElement="Add New Challenge"
          style={{flex: 1, alignSelf: 'stretch'}}
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
    //         Add New Challenge
    //       </Text>
    //       <View>
    //
    //       </View>
    //     </View>
    //   ),
    // };
  };

  handleCreateChallenge() {

    //TODO need to verify that adequate challenge data is included


    actions.createChallenge(this.state);
  }

  handleUserSearchInput(userSearch) {
    if (userSearch.length <= 2) return;
    console.log('hit handle ', userSearch);
    const userSearchRef = firebase.database().ref()
      .child('users')
      .orderByChild('email')
      .startAt(userSearch)
      .endAt(userSearch + '\uf8ff')
      .limitToFirst(2);

    let userSearchResults = [];
    userSearchRef.once('value', (snap) => {
      const searchObj = snap.val();
      userSearchResults = Object.keys(searchObj);
      userSearchResults = userSearchResults.map((key) => {
        return {id: key, email: searchObj[key].email};
      });
      this.setState({userSearchResults});
      console.log(this.state.userSearchResults);
    });
  }

  handleSelectUser(userID) {
    console.log('handleSelectUser', userID);
    //use the concat method so as not to mutate this.state
    let users = this.state.users.concat(userID);
    this.setState({users, userSearch: ''});
  }

  renderUserSearch({item, index}) {
    return(
      <TouchableOpacity
        style={styles.user_search_result}
        onPress={() => this.handleSelectUser(item.id)}
        >
        <Text style={{fontSize: 20}}> {item.email + ' -- ' + item.id} </Text>
      </TouchableOpacity>
    );
  }

  handleCatSwitch(catObj, idx, bool) {
    let categories = [];
    if (bool) {
      categories = this.state.categories.concat(catObj.name);
    } else {
      this.state.categories.forEach((cat) => {
        if(cat != catObj.name) categories.push(cat);
      })
    }
    this.setState({categories});
    this.setState((previousState) => {
      previousState.categoryOptions[idx].status = bool;
      return previousState;
    });
  }

  renderCategoryOptions({item, index}) {
    console.log('HIT RENDER CATEGORIES');
    return(
      <View
        style={styles.catContainer}
        >
        <Text style={styles.catText}>
          {item.name}
        </Text>
        <Switch
          style={styles.toggle}
          value={this.state.categoryOptions[index].status}
          onValueChange={(bool) => this.handleCatSwitch(item, index, bool)}
          />
      </View>
    );
  }


  closeModal() {
    this.setState({
      usersModalVisible: false,
      categoriesModalVisible: false,
      userSearch: '',
      userSearchResults: []
    });
  }

  renderCategories(){
    console.log(this.state.categories);
    if (this.state.categories.length > 0) {
      return (
        <View>
          {this.state.categories.map(cat => <Text> {cat} </Text>)}
        </View>
      )
    }
  }


  render() {
    console.log('HIT RENDER');
    return (
      <View
        style={styles.container}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.usersModalVisible}
          onRequestClose={() => this.closeModal()}
          >
          <View style={styles.container}>
            <Text style={styles.headerText}>
              Search for Users
            </Text>
            <TextInput
              placeholder={"Enter User Email (or Name?)"}
              style={styles.input2}
              value={this.state.userSearch}
              onChangeText={(userSearch) => {
                this.setState({userSearch, userSearchResults: []});
                this.handleUserSearchInput(userSearch);}
              }
              />
            <View style={styles.searchContainer}>
              <FlatList
                keyExtractor={(item, index) => item.email}
                data={this.state.userSearchResults}
                renderItem={userObj => this.renderUserSearch(userObj)}
                >
              </FlatList>
            </View>
            <Button
              text={'Add User'}
              onPress={() => {}}>
            </Button>
          </View>
        </Modal>

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.categoriesModalVisible}
          onRequestClose={() => this.closeModal()}
          >
          <View style={styles.container}>
            <Text style={styles.headerText}>
              Choose Categories for Your Challenge
            </Text>

            <TextInput
              placeholder={"Enter a New Category (not currently working)"}
              style={styles.input2}
              value={this.state.newCat}
              onChangeText={(newCat) => {}}
              />
            <FlatList
              keyExtractor={(item, index) => item.name}
              data={this.state.categoryOptions}
              extraData={this.state}
              renderItem={(catObj) => this.renderCategoryOptions(catObj)}
              >
            </FlatList>
            <Button
              text={'Add Categories'}
              onPress={() => {}}>
            </Button>
          </View>
        </Modal>

        <TouchableOpacity
          onPress={() => this.handleCreateChallenge()}
          style={styles.addChallengeButton}>
          <Text> Create Challenge </Text>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Text> Challenge Name </Text>
          <TextInput
            placeholder={"Name Your Challenge"}
            style={{height: 40, width: 160}}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
            />
        </View>

        <View style={styles.inputContainer}>
          <Text> Start Date </Text>
          <TextInput
            placeholder={"Start Date"}
            style={styles.input}
            onChangeText={(startDate) => this.setState({startDate})}
            value={this.state.startDate}
            />
        </View>

        <View style={styles.slider_container}>
          <Text> Length of Challenge (days) </Text>
          <View style={{flexDirection: 'row'}}>
            <Slider
              style={{height: 40, width: 260}}
              onSlidingComplete={(days) => {}}
              onValueChange={(days) => this.setState({days})}
              minimumValue={1}
              maximumValue={60}
              value={30}
              step={1}
              >
            </Slider>
            <Text> {this.state.days} </Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text> Categories </Text>
          <View>{this.renderCategories()}</View>
          <Button
            text='Add Categories'
            raised={true}
            onPress={() => this.setState({categoriesModalVisible: true})}>
          </Button>
        </View>

        <View style={styles.inputContainer}>
          <Text> Competitors </Text>
          <View>{this.state.users.map((userid) => <Text> {userid} </Text>)}</View>
          <Button
            text='Add Users'
            raised={true}
            onPress={() => this.setState({usersModalVisible: true})}>
          </Button>
        </View>

      </View>
    );
  }
}






const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    textAlign: 'center',
  },
  user_search_result: {

    marginBottom: 10,
    borderColor: 'grey',
    borderWidth: 1,
  },

  addChallengeButton: {
    height: 60,
    width: 100,
    borderColor: 'skyblue',
    borderWidth: 1,
    backgroundColor: 'powderblue',
    marginTop: 40,
    justifyContent: 'center',
  },
  input: {
    height: 50,
    width: 150,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
  },
  input2: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
  },
  inputContainer: {
    height: 50,
    width: 400,
    flexDirection: 'row',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  slider_container: {
    height: 50,
    width: 400,
    flexDirection: 'column',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  searchContainer: {
    // flex: 1,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },

  catContainer: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'lightgrey',
    borderColor: 'skyblue',
    borderWidth: 1
  },
  catText: {
    fontSize: 20,
    marginLeft: 15,
  },
  toggle: {
    marginRight: 15,
  },
});
