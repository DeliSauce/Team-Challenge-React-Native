import * as firebase from 'firebase';
import React, {Component} from 'react';
import * as actions from '../actions/firebase_actions';
import merge from 'lodash/merge';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Toolbar, Button } from 'react-native-material-ui';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import {
  Alert,
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
      days: '30',
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

  //TODO need better verification of challenge data
  handleCreateChallenge() {
    const {name, adminID, users, categories, startDate, days} = this.state;
    const challenge = {name, adminID, users, categories, startDate, days}
    console.log(challenge);
    let errorMessage = "";
    if (categories.length === 0) {
      errorMessage = "Please specify at least one category"
      Alert.alert("Title", errorMessage, []);
    } else if (!name) {
      errorMessage = "Please choose a challenge name."
      Alert.alert("Title", errorMessage, []);
    } else if (!startDate) {
      errorMessage = "Please select a startDate"
      Alert.alert("Title", errorMessage);
    } else {
      Alert.alert("Title", "Congrats! You've just created a challenge.");
      // actions.createChallenge(challenge);
      // actions.createChallenge(this.state);
    }
  }

  createAlert() {

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
          {this.state.categories.map((cat, idx) => <Text> {idx + 1 + '. ' + cat} </Text>)}
        </View>
      )
    }
  }


  render() {
    console.log('HIT RENDER');
    return (
      <View
        style={styles.container}>


        <View style={{
            flexDirection: 'row',
            borderColor: 'black',
            borderWidth: 1,
            alignItems: 'center'}}>

          <Button
            accent
            raised
            text='Submit Challenge'
            onPress={() => this.handleCreateChallenge()}>
          </Button>

          <Button
            accent
            raised
            text='Add Categories'
            onPress={() => this.setState({categoriesModalVisible: true})}>
          </Button>

          <Button
            accent
            raised
            text='Add Users'
            onPress={() => this.setState({usersModalVisible: true})}>
          </Button>

        </View>


        <View style={styles.inputContainer}>
          <Text style={{fontSize: 17}}> Challenge Name </Text>
          <TextInput
            placeholder={"Name Your Challenge"}
            style={{height: 40, width: 160}}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
            />
        </View>

        <View style={styles.inputContainer}>
          <Text style={{fontSize: 17}}> Start Date </Text>
          <DatePicker
            style={{width: 200}}
            date={this.state.startDate}
            mode="date"
            placeholder="select date"
            format="dddd, MMMM DD, YYYY"
            minDate={moment().format("dddd, MMMM DD, YYYY")}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
          }}
          onDateChange={(startDate) => {this.setState({startDate})}}
        />
        </View>

        <View style={styles.slider_container}>
          <Text style={{fontSize: 17}}> Length of Challenge (days) </Text>
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
          <Text style={{fontSize: 17}}> Categories: </Text>
          <View>{this.renderCategories()}</View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={{fontSize: 17}}> Competitors: </Text>
          <View>{this.state.users.map((userid, idx) => <Text> {idx + 1 + '. ' + userid} </Text>)}</View>
        </View>

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
    flexDirection: 'column',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  slider_container: {
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
