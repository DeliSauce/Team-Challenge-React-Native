## Team Challenge
Description:

Sample challenge: Fitness Challenge
- 5 people, 30 days, 10 categories
- receive 1 point per day for each category completed
- person with the most points is the winner

## Wireframes
- signup page (should only appear once - no logout necessary)
- challenge setup page
- challenges page
- challenge point setter
- settings page: notifications, etc.

# Firebase
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
