import * as firebase from 'firebase';

// export const searchForUsers = (userStub) => {
//   const userSearchRef = firebase.database().ref()
//     .child('users')
//     .orderByChild('email')
//     .startAt(userStub)
//     .limitToFirst(2);
//
//   let users = [];
//   userSearchRef.once('value', (snap) => {
//     // users.push(snap.val());
//     console.log("users search", snap.val());
//
//     users = Object.keys(snap.val());
//     console.log(users);
//     users.map((key) => {
//       return {id: key, email: snap.val()[key].email};
//     });
//     return users;
//   });
// };

export const changeChallengeData = (changeOptions) => {
  console.log("hit change challenge data: ", changeOptions);
  const {challengKey, userID, dayIdx, catIdx, boolVal} = changeOptions;

  const updates = {};
  updates['challenges/' + challengKey +'/userData/' + userID + '/' + dayIdx + '/' + catIdx] = boolVal;

  firebase.database().ref().update(updates);
};

export const createChallenge = (challengeOptions) => {
  console.log("challengeOptions", challengeOptions);

  const {name, adminID, users, categories, startDate, days} = challengeOptions;
  let catEntries = Array(categories.length).fill(false);
  let emptyEntriesMatrix = Array(parseInt(days)).fill(catEntries);

  let userData = {};
  users.forEach((userObj) => {userData[userObj.id] = emptyEntriesMatrix;});

  let firebaseUpdates = {};
  const challengeUpdates = {
    name,
    adminID,
    startDate,
    days,
    users,
    categories,
    userData,
  };
  const userUpdates = {
    name,
    adminID,
    startDate,
    days,
  };

  const newChallengeKey = firebase.database().ref().child('challenges').push().key;
  firebaseUpdates['challenges/' + newChallengeKey] = challengeUpdates;
  users.forEach((userObj) => {
    firebaseUpdates['users/' + userObj.id + '/challenges/' + newChallengeKey] = userUpdates;
  });
  console.log("firebase updates new Challenge", firebaseUpdates);
  // firebase.database().ref().update(firebaseUpdates);
  create(firebaseUpdates);
};

const create = async (firebaseUpdates) => {
  try {
    response = await firebase.database().ref().update(firebaseUpdates);
    console.log("Add challenge successful response: ", response);
  } catch (errors) {
    console.log("Add challenge failure errors: ", errors);
  }
};
