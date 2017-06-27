# Team Challenge
Mobile app built with React Native that allows groups of people to create and track challenge benchmarks. Utilizes Firebase for authentication and syncing data in real time.

Sample challenge: Fitness Challenge
- 5 people, 30 days, 10 categories
- receive 1 point per day for each category completed
- person with the most points is the winner

### Firebase ()
- Provides user authentication.
- Utilizes realtime database to update information for all users when changes are made.
- NoSQL as opposed to a relational database. Data is stored in a JSON tree.
https://firebase.google.com/docs/database/web/structure-data

      Firebase Database Model:
      {
        users: {
          "user_0001": {
            name: "John Doe",
            email: "JohnDoe@gmail.com",
            id: "user_0001",
            photo: "www.photo1.com",           
            provider: "facebook.com",
            contacts: { ... },
            challenges: {
              "challenge_001": {
                name: "Workout Challenge",
                adminID: "user_0001",
                days: "30",
                startDate: "2017-06-22"
              },
              "challenge_0002": {
                ...
              }
            }
          },
          Jane: { ... }
        },

        //indexed on email
        userLookup: {
          "user_0001": {
            name: "John Doe",
            email: "JohnDoe@gmail.com",
            photo: "www.photo1.com",
            provider: "facebook.com"
          },
          "user_0002": { ... }
        },

        challenges: {
          "challenge_0001": {
            name: "Workout Challenge",
            admin: "user_0001",
            days: "30"
            startDate: "2017-06-22",
            categories: {
              0: "60 sit-ups",
              1: "walk to work",
              ...
            }
            competitors: {
              0: {
                email: "JohnDoe@gmail.com",
                id: "user_0001"
                },
              1: {
                email: "JaneDoe@gmail.com",
                id: "user_0002"
                }
              ...
            },
            userData: {
              "user_0001": {
                [[false, true, true],
                 [true, true, true],
                 [false, false, false]]
              },
              "user_0002": {
                [[true, true, true],
                 [true, true, false],
                 [false, true, true]]
              }
            }
          },
          "challenge_0002": { ... }
        }
      }

## Firebase CLI commands
- react-native run-android
- react-native run-ios

#### creating APK
creating apk (and deleting old apk)
- cd android && ./gradlew clean && ./gradlew assembleRelease

loading apk to phone
- cd .. && react-native run-android --variant=release


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


#### Privacy Policy
The app uses your contacts to search for friends to join a challenge.
At no point will we use your contact information for personal or
financial gains.


## To Do
- currently no way to add users to challenge if they haven't already created an account
- add OmniAuth and figure out how to log in automatically
    - Google auth?
- disable drawer nav while in tab nav
    - waiting for pull request #793 to go through which will resolve this
    - https://github.com/react-community/react-navigation/pull/793
    - https://github.com/react-community/react-navigation/issues/1082
- decide what to do with contacts on signup
- convert app to Redux state management
- style header component (Login and LoaderPage)
- add spinner to LoaderPage
- add spinner to AllChallenges while awaiting firebase data
- deal with offline status???
- remove "userLookup" from Firebase db as somewhat duplicative of "users" ('users' contains some info re challenges but not much)???
- make user search case insensitive. Currently on ios search defaults to caps and emails are lower case


Completed tasks
- update header block in nav sidebar (w/ profile pic, etc.)
- autocomplete on TextInput does not update state (ios only?) need to fix this (turn it off?)
