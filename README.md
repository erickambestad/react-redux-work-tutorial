**Things to know**
==================
Store - http://redux.js.org/docs/basics/Store.html

Reducers - http://redux.js.org/docs/basics/Reducers.html

Actions - http://redux.js.org/docs/basics/Actions.html

Async actions - http://redux.js.org/docs/advanced/AsyncActions.html  

3 Principles:
-------------
The state of your whole application is stored in an object tree within a single store.

State is read-only.  The only way to mutate the state is to emit an action, an object describing what happened.

Changes are made with pure functions.  To specify how the state tree is transformed by actions, you write pure reducers.  

Reducers
--------
Actions describe the fact that something happened, but don’t specify how the application’s state changes in response. This is the job of a reducer.

The reducer is a pure function that takes the previous state and an action, and returns the next state.  

Steps to converting a React app to a React/Redux/Immutable app.
---------------------------------------------------------------

Store
-----
Store holds current state of the application

Lets you dispatch actions

When created it will specify the reducer that will manage the state updates

store.getState() returns the current state in the store
store.dispatch() will dispatch an action creator
store.subscribe() registers a callback that the store will call anytime an action gets dispatched (this gets taken care of with react-redux so we won't use often)  

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
