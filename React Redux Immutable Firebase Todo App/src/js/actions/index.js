"use strict";

/**
 * Actions are payloads of information that send data from your application to your store.
 * They are the only source of information for the store. You send them to the store using store.dispatch().
 *
 * Actions are plain JavaScript objects. Actions must have a type property that indicates the type of action being performed.
 * Types should typically be defined as string constants.
 */


import reqwest from 'reqwest';
import firebase from 'firebase';

import {
  REQUEST_ITEMS,
  RECIEVE_ITEMS,
  ATTEMPTING_LOGIN,
  LOGIN_USER,
  LOGIN_ERROR,
  LOGOUT,
  LOGOUT_ERROR
} from '../actionTypes';

export function loadItems() {
  return dispatch => {
    dispatch(requestItems());
    reqwest('/api/list.json', (items) => {
      dispatch(recieveItems(items))
    });
  }
}

function requestItems() {
  return {
    type: REQUEST_ITEMS
  }
}

function recieveItems(items) {
  return {
    type: RECIEVE_ITEMS,
    items
  }
}

export function startListeningToItems() {
  return dispatch => {
    // Start the item request
    dispatch({
      type: REQUEST_ITEMS
    })
    // Check for user since we'll need their db key
    let user = firebase.auth().currentUser;
    // If the user exists, move on.. otherwise log them out.  They shouldn't be there anyways.
    if (user && user.uid) {
      // Set the event to dispatch the items every single change
      firebase.database().ref('items/' + user.uid).on('value', (snapshot) => {
        dispatch({
          type: RECIEVE_ITEMS,
          items: snapshot.val()
        })
      })
    } else {
      dispatch({
        type: LOGOUT
      });
    }
  }
}


// auth
export function startListeningToAuth() {
  return (dispatch, getState) => {
    dispatch({type: ATTEMPTING_LOGIN});
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User signed in
        dispatch({
          type: LOGIN_USER,
          uid: user.uid,
          username: user.email
        })
      } else {
        // User not logged in
        if (getState()['app'].get('auth').get('currently') !== 'ANONYMOUS') {
          dispatch({
            type: LOGOUT
          });
        }
      }
    });
  }
}

export function login(email, password) {
  return dispatch => {
    dispatch({type: ATTEMPTING_LOGIN});
    firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
      if (error) {
        dispatch({
          type: LOGIN_ERROR,
          error: error.message
        });
      } else {
        // Auth listener will take care of this part, do nothing.
      }
    });
  }
}

export function logout() {
  return dispatch => {
    firebase.auth().signOut().then(() => {
      dispatch({
        type: LOGOUT
      })
    }, (error) => {
      dispatch({
        type: LOGOUT_ERROR,
        error
      })
    });
  }
}
