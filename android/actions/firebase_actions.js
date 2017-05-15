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
  // console.log('firebase createChallenge action', challengeOptions);
  const {name, adminID, users, categories, startDate, days} = challengeOptions;

  let catEntries = Array(categories.length).fill(false);
  let entries = Array(parseInt(days)).fill(catEntries);

  let userData = {};
  users.forEach((user) => {
    userData[user] = entries;
  });

  // for(let i = 0; i < days; i++) {
  //   date.setDate(date.getDate() + 1);
  //   let day = date.getDate();
  //   let month = date.getMonth() + 1;
  //   let year = date.getFullYear();
  //   dates.push(day + '-' + month + '-' + year);
  // }

  const data = {
    name,
    adminID,
    startDate,
    days,
    categories,
    userData
  };

  const newChallengeKey = firebase.database().ref().child('challenges').push().key;
  let updates = {};
  updates['challenges/' + newChallengeKey] = data;

  //TODO need to update this for all users, not just admin
  updates['users/' + adminID + '/challenges/' + newChallengeKey] = true;
  return firebase.database().ref().update(updates);
};
