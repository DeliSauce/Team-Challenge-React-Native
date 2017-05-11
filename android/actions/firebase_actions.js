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


export const createChallenge = (challengeOptions) => {
  console.log('firebase createChallenge action', challengeOptions);
  const {name, adminID, users, categories, startDate, days} = challengeOptions;
  let date = new Date(startDate);
  let dates = [];

  let dateEntries = new Array(days).fill(false);
  let entries = new Array(categories.length).fill(dateEntries);

  let userData = {};
  users.forEach((user) => {
    userData[user] = entries;
  });

  for(let i = 0; i < days; i++) {
    date.setDate(date.getDate() + 1);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    dates.push(day + '-' + month + '-' + year);
  }

  const data = {
    name,
    adminID,
    startDate,
    days,
    dates,
    categories,
    userData
  };

  const newChallengeKey = firebase.database().ref().child('challenges').push().key;
  console.log(newChallengeKey);
  let updates = {};
  updates['challenges/' + newChallengeKey] = data;

  //TODO need to update this for all users, not just admin
  updates['users/' + adminID + '/challenges/' + newChallengeKey] = true;
  return firebase.database().ref().update(updates);
};
