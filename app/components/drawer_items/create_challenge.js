import * as firebase from 'firebase';
import React, {Component} from 'react';
import * as actions from '../../actions/firebase_actions';
import merge from 'lodash/merge';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { Toolbar, Button, COLOR} from 'react-native-material-ui';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
// import {ModalAlert} from './alert';
import store from 'react-native-simple-store';
// var TrieSearch = require('trie-search', {min: 2, indexField: 'idx'});

import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Slider,
  Picker,
  FlatList,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Switch
} from 'react-native';

export default class CreateChallenge extends Component {
  constructor(props) {
    super(props);
    this.userID = firebase.auth().currentUser.uid;
    // this.defaultCategories = [
    //   {name: 'Placeholder 1.', status: false},
    //   {name: 'Placeholder 2.', status: false},
    //   {name: 'Placeholder 3.', status: false},
    //   {name: 'Placeholder 4.', status: false},
    // ];
    this.defaultCategories = [];

    this.state = {
      startDate: moment().format("YYYY-MM-DD"),
      days: '30',
      adminID: this.userID,
      competitors: [{id: this.userID, email: ''}],
      categoryOptions: this.defaultCategories,
      categories: [],
      name: '',
      categoriesModalVisible: false,
      userSearchModalVisible: false,
      userAddedModalVisible: false,
      userSearch: '',
      userSearchResults: [{id: '', email: ''}],
    };
    console.log("printing add challenge props", props);
    this.contacts = {};
    this.getContacts();

    // this.contactsTrie = new TrieSearch(['email', 'givenName', 'familyName']);
    // this.getContacts();
    // console.log(this.contacts);
  }

  getContacts () {
    store.get('Contacts')
      .then((contacts) => {
        // console.log("contacts: ", contacts);
        // contacts.forEach((contactObj) => {this.contactsTrie.add(contactObj)});
        contacts.forEach((contactObj) => {
          this.contacts[contactObj.email] = {thumbnailPath: contactObj.thumbnailPath, givenName: contactObj.givenName, familyName: contactObj.familyName};
        });
      })
      .catch((error) => console.log("No contacts saved (contacts === null): ", error));
  }

  componentWillMount() {
    store.get('userData').then((userData) => {
      //userData: name, email, photo, provider, id
      const user = {id: userData.id, email: userData.email}
      this.setState({competitors: [user], currentUser: user})
    });
  }

  componentDidMount() {
    // console.log(this.contacts);
  }

  componentWillUpdate() {
    console.log(this.state.startDate);
    // console.log(moment(this.state.startDate).format("dddd, MMMM DD, YYYY"));
  }

  static navigationOptions = ({navigation}) => {
    //it appears that you can set the icon size about 5 pixels greater than fontSize
    return {
      drawerLabel: 'Create Challenge',
      drawerIcon: ({tintColor}) => (
        <IconMaterial name="playlist-add" size={25} color={tintColor} />
      )
    }
  };

  //TODO need better verification of challenge data
  handleCreateChallenge() {
    let {name, adminID, competitors, categories, startDate, days} = this.state;
    console.log(startDate);
    const challenge = {name, adminID, competitors, categories, startDate, days}
    // console.log(challenge);
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
      actions.createChallenge(challenge);
    }
  }

  //OLD METHOD: using contacts
  // handleUserSearchInput(userSearch) {
  //   let userSearchResults  = this.contactsTrie.get(userSearch).slice(0,5)
  //   this.setState({userSearchResults});
  // }

  handleUserSearchInput(userSearch) {
    if (userSearch.length < 1) return;
    console.log('hit handle ', userSearch);
    const userSearchRef = firebase.database().ref()
      .child('userLookup')
      .orderByChild('email')
      .startAt(userSearch)
      .endAt(userSearch + '\uf8ff')
      .limitToFirst(10);

    let userSearchResults = [];

    userSearchRef.once('value', (snap) => {
      if (snap.val() !== null) {
        const searchObj = snap.val();
        console.log(searchObj);
        const usersIDs = this.state.competitors.map((userObj) => userObj.id);
        userSearchResults = Object.keys(searchObj).filter((uid) => !usersIDs.includes(uid));
        userSearchResults = userSearchResults.map((key) => {
          let contact = this.contacts[searchObj[key].email];
          let contactData = {};
          if (contact) {
            contactData = contact
          }
          return merge(contactData, {id: key, email: searchObj[key].email});
        });
      } else {
        userSearchResults = null;
      }
      this.setState({userSearchResults});
    });
  }

  handleSelectUser(userObj) {
    console.log('handleSelectUser', userObj);
    //use the concat method so as not to mutate state
    let competitors = this.state.competitors.concat(userObj);
    this.setState({competitors, userSearch: ''});
    Alert.alert('Title', `${userObj.email} has been added.`, []);
  }

  renderUserSearch() {
    if (this.state.userSearch.length === 0) {
      return;
    }
    if (this.state.userSearchResults) {
      console.log('this.state.userSearchResults', this.state.userSearchResults);
      return (
        <FlatList
          keyboardShouldPersistTaps="handled"
          keyExtractor={(item, index) => item.email}
          data={this.state.userSearchResults}
          renderItem={userObj => this.renderUserSearchItem(userObj)}
          >
        </FlatList>
      )
    } else {
      return (
        <View style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
          <Text>
            We couldn't find anything for {this.state.userSearch}.
          </Text>
          <Text>
            Try searching for a different email address.
          </Text>
        </View>
      )
    }
  }

  renderUserSearchItem({item, index}) {
    // let userSearchRef = firebase.database().ref()
    //   .child('userLookup')
    //   .orderByChild('email')
    //   .equalTo(item.email);
    // userSearchRef.once('value', (snap) => {
    //   let id = (snap.val()) ? Object.keys(snap.val())[0] : 'none'
    //   this.setState((previousState) => {
    //     previousState.userSearchResults[index].id = id;
    //     return previousState;
    //   });
    // });

    // return(
    //   <TouchableOpacity
    //     style={styles.user_search_result}
    //     onPress={() => this.handleSelectUser(item) }>
    //     <View>
    //       <Text style={{fontSize: 15}}>
    //       {item.email}
    //       </Text>
    //     </View>
    //   </TouchableOpacity>
    // );
    let userImage = (item.thumbnailPath) ?
      <Image style={{resizeMode: 'contain', flex: 1}} source={{uri: item.thumbnailPath}} /> :
      <IconFontAwesome name="user-circle" size={25} color='black' />

    let userName = (item.givenName) ?
      item.givenName + " " + item.familyName :
      "----"

    return(
      <TouchableOpacity
        style={styles.user_search_result}
        onPress={() => this.handleSelectUser(item) }>
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 5}}>
          <View style={{height: '80%', width: '80%', }}>
            {userImage}
          </View>
        </View>
        <View style={{flex: 5, justifyContent: 'center', borderColor: 'grey',
            borderBottomWidth: 1}}>
          <Text style={{fontSize: 15, color: 'black'}}>{userName}</Text>
          <Text style={{fontSize: 12, color: 'blue'}}>{item.email}</Text>
        </View>

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
        style={styles.category_container}
        >
        <Text style={styles.category_text}>
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
      userSearchModalVisible: false,
      categoriesModalVisible: false,
      userAddedModalVisible: false,
      userSearch: '',
      userSearchResults: []
    });
  }

  renderCategories(){
    // console.log(this.state.categories);
    if (this.state.categories.length > 0) {
      return (
        <View style={{}}>
          {this.state.categories.map((cat, idx) => <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}} key={idx} > {idx + 1 + '. ' + cat} </Text>)}
          <View style={{height: 20}}></View>
        </View>
      )
    } else {
      return (
        <Text style={{fontSize: 15, color: 'red'}}>
          Please add challenge categories.
        </Text>
      )
    }
  }

  renderUsers() {
    const listOfUsers = this.state.competitors.map((userObj, idx) => <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}} key={idx} > {idx + 1 + '. ' + userObj.email} </Text>)

    return (
      <View>
        {listOfUsers}
      </View>
    )
  }

  handleAddNewCat() {
    newCat = {name: this.state.newCat, status: true};
    let categories = this.state.categories.concat(this.state.newCat);
    let categoryOptions = this.state.categoryOptions.concat(newCat);
    this.setState({newCat: '', categoryOptions, categories});
  }

  render() {
    console.log('HIT RENDER');
    return (
      <View
        style={styles.container}>
        <Toolbar
          leftElement="menu"
          onLeftElementPress={() => this.props.navigation.navigate('DrawerOpen')}
          centerElement="Add New Challenge"
          style={{flex: 1, alignSelf: 'stretch'}}
          />
        <ScrollView>
          <View style={styles.input_container}>
            <Text style={{fontSize: 22, fontWeight: 'bold', marginRight: 10}}>
              Challenge Name:
            </Text>
            <TextInput
              placeholder={"Fitness, Diet, etc."}
              style={{fontSize: 17, flex: 1, fontWeight: 'bold'}}
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
              autoCapitalize={'words'}
              autoFocus={false}
              />
          </View>

          <View style={styles.section_divider}></View>

          <View style={styles.input_container}>
            <Text style={{fontSize: 22, fontWeight: 'bold', marginRight: 10}}>
              Start Date:
            </Text>
            <DatePicker
              style={{width: 250}}
              mode="date"
              placeholder="select date"
              date={moment(this.state.startDate).format("dddd, MMMM DD, YYYY")}
              format="dddd, MMMM DD, YYYY"
              onDateChange={ (startDate) => {
                this.setState({
                  startDate: moment(startDate, "dddd, MMMM DD, YYYY")
                  .format('YYYY-MM-DD')
                });
              }}
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
                  marginLeft: 35,
                },
                dateText: {
                  fontSize: 15,
                  fontWeight: 'bold'
                }
                // ... You can check the source to find the other keys.
              }}
              />
          </View>

          <View style={styles.section_divider}></View>

          <View style={styles.row_container}>
            <View style= {{flex: 4}}>
              <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                Competitors:
              </Text>
              {this.renderUsers()}
            </View>
            <View style= {{flex: 2, margin: 10, justifyContent: 'space-around'}}>

              <Button
                style={{container: {width: 130, height: 45, marginTop: 5, marginBottom: 5}, text: {fontSize: 18}}}
                primary
                raised
                upperCase={false}
                text='Add Users'
                onPress={() => this.setState({userSearchModalVisible: true})}>
              </Button>

              <Button
                style={{container: {width: 130, height: 45, marginTop: 5, marginBottom: 5}, text: {fontSize: 18}}}
                accent
                raised
                upperCase={false}
                text='Clear Users'
                onPress={ () => this.setState({ competitors: [this.state.currentUser] }) }>
              </Button>

            </View>
          </View>

          <View style={styles.section_divider}></View>

          <View style={styles.slider_container}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                Challenge Length (days):
              </Text>
              <Text style={{fontSize: 22, fontWeight: 'bold', color: 'black'}}>    {this.state.days}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Slider
                style={{height: 40, width: '90%'}}
                onSlidingComplete={(days) => {}}
                onValueChange={(days) => this.setState({days})}
                minimumValue={1}
                maximumValue={60}
                value={30}
                step={1}
                >
              </Slider>
            </View>
          </View>

          <View style={styles.section_divider}></View>

          <View style={styles.column_container}>
            <Text style={{fontSize: 22, fontWeight: 'bold', textAlign: 'left', width: '100%'}}>
              Challenge Categories:
            </Text>
            <View style={{width: '100%'}}>
              {this.renderCategories()}
            </View>
            <Button
              style={{container: {marginTop: 10, marginBottom: 10, height: 45, width: 160}, text: {fontSize: 18}}}
              primary
              raised
              upperCase={false}
              text='Add Categories'
              onPress={() => this.setState({categoriesModalVisible: true})}>
            </Button>
          </View>

          <View style={styles.section_divider}></View>

        </ScrollView>
        <View style={{
          width: '100%',
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-around',
          // borderColor: 'black',
          // borderWidth: 1,
          alignItems: 'center'}}>
          <Button
            style={{container: {backgroundColor: COLOR.yellow700, margin: 10, height: 60, width: '80%'}, text: {textAlign: 'center', color: 'white', fontSize: 28, }}}
            raised
            text='Create Challenge'
            onPress={() => this.handleCreateChallenge()}>
          </Button>

        </View>

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.userSearchModalVisible}
          onRequestClose={() => this.closeModal()}
          >
          <Toolbar
            leftElement="arrow-back"
            onLeftElementPress={() => this.closeModal()}
            centerElement="Search for Users"
            style={{flex: 1, alignSelf: 'stretch'}}
          />
          <View style={styles.container}>
            <TextInput
              autoCapitalize='none'
              autoFocus='true'
              autoCorrect={false}
              keyboardType='email-address'
              placeholder={"Enter User Email"}
              style={styles.input2}
              value={this.state.userSearch}
              onChangeText={(userSearch) => {
                this.setState({userSearch});
                this.handleUserSearchInput(userSearch);}
              }
              />
            <View style={styles.searchContainer}>
              {this.renderUserSearch()}
            </View>
          </View>
        </Modal>

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.categoriesModalVisible}
          onRequestClose={() => this.closeModal()}>

          <Toolbar
            leftElement="arrow-back"
            onLeftElementPress={() => this.closeModal()}
            centerElement="Choose Challenge Categories"
            style={{flex: 1, alignSelf: 'stretch'}}
            />

          <KeyboardAvoidingView style={styles.container}>
            <FlatList
              keyExtractor={(item, index) => item.name}
              data={this.state.categoryOptions}
              extraData={this.state}
              renderItem={(catObj) => this.renderCategoryOptions(catObj)}
              >
            </FlatList>

            <View style={{backgroundColor: COLOR.green500, padding: 15}}>
              <TextInput
                placeholder={"Add a category to your challenge..."}
                style={styles.input2}
                value={this.state.newCat}
                onChangeText={(newCat) => {this.setState({newCat})}}
                autoCapitalize={'sentences'}
                returnKeyType={'done'}
                onEndEditing={() => {this.handleAddNewCat()}}
                />
            </View>
          </KeyboardAvoidingView>

        </Modal>
      </View>
    );
  }
}

// <Modal
//   animationType={"slide"}
//   transparent={false}
//   visible={this.state.userSearchModalVisible}
//   onRequestClose={() => this.closeModal()}
//   >
//   <Toolbar
//     leftElement="arrow-back"
//     onLeftElementPress={() => this.closeModal()}
//     centerElement="Search for Users"
//     style={{flex: 1, alignSelf: 'stretch'}}
//   />
//   <View style={styles.container}>
//     <TextInput
//       keyboardType='email-address'
//       placeholder={"Enter User Email (or Name?)"}
//       style={styles.input2}
//       value={this.state.userSearch}
//       onChangeText={(userSearch) => {
//         this.setState({userSearch, userSearchResults: []});
//         this.handleUserSearchInput(userSearch);}
//       }
//       />
//     <View style={styles.searchContainer}>
//       <FlatList
//         keyboardShouldPersistTaps="handled"
//         keyExtractor={(item, index) => item.email}
//         data={this.state.userSearchResults}
//         renderItem={userObj => this.renderUserSearchItem(userObj)}
//         >
//       </FlatList>
//     </View>
//   </View>
// </Modal>


const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    textAlign: 'center',
  },
  user_search_result: {
    flexDirection: 'row',
    width: 400,
    height: 60,
  },
  input_container: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
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
    backgroundColor: 'white',
    borderRadius: 3,
  },
  section_divider: {
    width: '100%',
    borderColor: COLOR.grey200,
    borderBottomWidth: 1,
    height: 1,
    marginTop: 5,
    marginBottom: 5,
  },
  row_container: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    justifyContent: 'space-between',
  },
  column_container: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    justifyContent: 'space-between',
  },
  slider_container: {
    flexDirection: 'column',
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  searchContainer: {
    flex: 1,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
  },

  category_container: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#87edd7',
    borderBottomColor: '#7bd8c4',
    borderBottomWidth: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  category_text: {
    fontSize: 20,
    width: '80%'
  },
  toggle: {
    width: '20%'
  },
});
