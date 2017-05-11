import * as firebase from 'firebase';
import React, {Component} from 'react';
import * as actions from '../actions/firebase_actions';
import merge from 'lodash/merge';

import {
  Slider,
  Picker,
  Button,
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
    // this.defaulCategories = [{'pushups': false}, {'walk': true}];
    this.defaulCategories = [{name: 'pushups', status: false}, {name: 'run', status: false}, {name: 'walk', status: true}];

    this.defaultChallenge = {
      name: 'Health Challenge',
      startDate: '01-23-2017',
      days: '30',
      adminID: this.userID,
      users: [this.userID, 'TEST'],
      categories: this.defaulCategories,
    };

    this.otherProperties = {
      categoriesModalVisible: false,
      usersModalVisible: false,
      userSearch: '',
      userSearchResults: [{id: '', email: ''}],
      TESTswitch: false,
    };

    this.state = merge({}, this.defaultChallenge, this.otherProperties);
  }

  //TODO add userIDs for users other than admin
  createChallenge() {
    // console.log('creaete chall', this.state, this.defaultChallenge, this.userID);
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

  renderUserSearch({item, index}) {
    return(
      <TouchableOpacity
        style={styles.user_search_result}
        key={index}
        >
        <Text style={{fontSize: 20}}> {item.email + item.id} </Text>
      </TouchableOpacity>
    );
  }

  handleCatSwitch(catObj, idx, bool) {
    // console.log('cats', this.state.categories);
    // console.log('idx: ', idx);
    // console.log('cat obj index', this.state.categories.indexOf(catObj));
    // // let updatedCat = merge({}, catObj);
    // catObj.status = !catObj.status;
    // // updatedCat.status = !updatedCat.status;
    //
    // console.log('cats', this.state.categories);
    // let categories = this.state.categories;
    // this.setState({categories});
    // console.log('cats', this.state.categories);

    let TESTswitch = !bool;
    this.setState({TESTswitch});
    // console.log(catObj, idx);
    // this.setState((previousState) => {
    //   previousState.categories[idx].status = !previousState.categories[idx].status;
    //   return previousState;
    // });
  }

  renderCategories({item, index}) {
    // const cat = Object.keys(item)[0];
    // this.state.categories[index][cat]
    // console.log(this.state.categories[index].status);
    // value={this.state.categories[index].status}
    // onValueChange={(bool) => this.handleCatSwitch(item, index, bool)}

    return(
      <View
        style={styles.default}
        key={index}
        >
        <Text style={{fontSize: 20}}> {item.name} </Text>
        <Switch
          value={this.state.TESTswitch}
          onValueChange={(value) => this.setState({TESTswitch: value})}
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

  render() {
    return (
      <View style={styles.container}>

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.usersModalVisible}
          onRequestClose={() => this.closeModal()}
          >
          <Text style={styles.header_text}>
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
          <View style={styles.search_container}>
            <FlatList
              data={this.state.userSearchResults}
              renderItem={userObj => this.renderUserSearch(userObj)}
              >
            </FlatList>
          </View>
          <Button title={'Add User'} onPress={() => {}}>
          </Button>
        </Modal>

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.categoriesModalVisible}
          onRequestClose={() => this.closeModal()}
          >
          <Text style={styles.header_text}>
            Choose Categoies for Your Challenge
          </Text>
          <TextInput
            placeholder={"Enter a New Category (not currently working)"}
            style={styles.input2}
            value={this.state.newCat}
            onChangeText={(newCat) => {}}
            />
          <View style={styles.search_container}>
            <FlatList
              data={this.state.categories}
              renderItem={(cat) => this.renderCategories(cat)}
              >
            </FlatList>
          </View>
          <Button title={'Add Categories'} onPress={() => {}}>
          </Button>
        </Modal>

        <TouchableOpacity
          onPress={() => this.createChallenge()}
          style={styles.addChallengeButton}>
          <Text> Add Challenge </Text>
        </TouchableOpacity>

        <View style={styles.input_container}>
          <Text> Challenge Name </Text>
          <TextInput
            placeholder={"Challenge Name"}
            style={{height: 40, width: 160}}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
            />
        </View>

        <View style={styles.input_container}>
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

        <View style={styles.input_container}>
          <Text> Categories </Text>
          <Button title={'Add Categories'} onPress={() => this.setState({categoriesModalVisible: true})}>
          </Button>
        </View>

        <View style={styles.input_container}>
          <Text> Competitors </Text>
          <Button title={'Add Users'} onPress={() => this.setState({usersModalVisible: true})}>
          </Button>
        </View>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  header_text: {
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
  input_container: {
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  search_container: {
    // flex: 1,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  default_style: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'grey',
    borderColor: 'skyblue',
    borderWidth: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  errors: {
    textAlign: 'center',
    alignSelf: "stretch",
    color: 'red',
  }
});
