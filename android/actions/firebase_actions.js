import * as firebase from 'firebase';

export const createChallenge = (name, admin, users, categories, startDate, days) => {
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
    admin,
    dates,
    categories,
    userData
  };

  const newChallengeKey = firebase.database().ref().child('challenges').push().key;
  console.log(newChallengeKey);
  let updates = {};
  updates['challenges/' + newChallengeKey] = data;
  //updates['users/' + currentUserID + '/challenges/' + newChallengeID] = true;
  return firebase.database().ref().update(updates);
};
