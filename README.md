# Team Challenge
Mobile app built with React Native that allows groups of people to create and track challenge benchmarks. Utilizes Firebase for authentication and syncing data in real time.

Sample challenge: Fitness Challenge
- 5 people, 30 days, 10 categories
- receive 1 point per day for each category completed
- person with the most points is the winner

### Wireframes
- signup page
  - should only appear once - no logout necessary
  - request access to contact list
- challenge setup page
  - invite members
  - set up challenge categories - type in or choose?
  - require same-day points tallying (bonus)
- challenges page
  - list current and past challenges
- page for adding category completion points
  - simple slide button toggle should suffice
- settings page
  - standings notifications
  - point tally reminder
  - hints/encouragements

### Tasks
- figure out firebase authentication
- complete firebase data model: NoSQL
- create wireframes
- frontend with react native

### Firebase INCOMPLETE
- Provides user authentication.
- Quickly updates information for all users when changes are made.
- NoSQL as opposed to a relational database. Data is stored in a JSON tree.
https://firebase.google.com/docs/database/web/structure-data

      Database Model: INCOMPLETE
      {
        "users": {
          "John": {
            "name": "John Doe",
            "email": "JohnDoe@gmail.com",
            "contacts": { ... },
            "challenges": {
              "0000001": true,
              "1212121": true
            }
          },
          Jane: { ... }
        }
        "challenges": {
          "0000001": {
            "name": "Workout Challenge",
            "admin": "John",
            "members": {
              "John": true,
              "Jane": true,
              ...
              },
            "data": {
              "John": {
                "60 sit-ups": {
                  "date1": true,
                  "date2": false,
                  "date3": true
                },
                "walk to work": {
                  "date1": false,
                  "date2": true,
                  "date3": true
                },
              }
            }
          },
          "1212121": { ... }
        }
      }



Modules
- some packages include further instructions (see below) but many of these are
deprecated with the "react-native link" CLI command

- react-native-material-ui
https://www.npmjs.com/package/react-native-material-ui

- react-native-material-design (may end up not using this - does not seem well supported/tested)
https://github.com/react-native-material-design/react-native-material-design#installation


- react-native-vector-icons
   -- did not have to use rnpm as it is now a merged into React Native Core
   (just need to enter in CLI: <react-native link>)
https://github.com/oblador/react-native-vector-icons#installation
