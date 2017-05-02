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
