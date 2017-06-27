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


## Completed tasks
- update header block in nav sidebar (w/ profile pic, etc.)
- autocomplete on TextInput does not update state (ios only?) need to fix this (turn it off?)
