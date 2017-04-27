# Team Challenge
Mobile app built with React Native that allows groups of people to create and track challenge benchmarks. Utilizes Firebase for authentication and synced data in real time.

Sample challenge: Fitness Challenge
- 5 people, 30 days, 10 categories
- receive 1 point per day for each category completed
- person with the most points is the winner

### Wireframes
- signup page
  - should only appear once - no logout necessary
- challenge setup page
  - invite members
  - set up challenge categories
- challenges page
  - list current and past challenges
- page for adding category completion points
  - allow only for that day or allow multi-day?
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
        users: {
          John: {
            name: "John Doe",
            email: "JohnDoe@gmail.com",
            challenges: {
              0000001: true,
              1212121: true
            }
          },
          Jane: {

          }
        }

        challenges: {
          0000001: {
            name: "workout challenge",
            members: ,
            admin: ,
          }
        }
      }
