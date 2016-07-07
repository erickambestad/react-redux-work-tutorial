Steps to converting a React app to a React/Redux/Immutable app.

1. Create new files
  - store.js - creates the store which connects the reducers to the app and applies any middleware we'd like to use
  - initialState.js - An immutable object that shows the structure of the entire app's state
  - actionTypes.js - Holds the action types of every action in the app, all types should be exportable modules
  - actions/index.js - Hold all of the app's action creators which return the plain javascript action object
  - reducers/index.js - The reducer of the entire app which is the files that modifies state

2. Populate the actionTypes.js file with the actions we wish to perform

3. Import the action types to the actions/index.js file and build the action creators

4. Populate a blank reducer in reducers/index.js to hook in to the app that returns initial state for now

5. Populate the store.js with the reducers and middleware

6. Connect the store to the react-router through Provider

6. Turn the smart components in to Redux containers

7. Import the action creators needed to bind to the smart component

8. Bind actions and state to props

9. Replace all state with the redux props
