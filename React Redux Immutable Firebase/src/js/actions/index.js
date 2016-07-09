"use strict";

/**
 * Actions are payloads of information that send data from your application to your store.
 * They are the only source of information for the store. You send them to the store using store.dispatch().
 *
 * Actions are plain JavaScript objects. Actions must have a type property that indicates the type of action being performed.
 * Types should typically be defined as string constants.
 */


import reqwest from 'reqwest';
import firebase from 'firebase'

import {
  REQUEST_ITEMS,
  RECIEVE_ITEMS,
  UPDATE_ITEM,
  ADD_ITEM,
  DELETE_ITEM,
  TOGGLE_ITEM_COMPLETION,
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

export function updateItem(item) {
  return {
    type: UPDATE_ITEM,
    item
  }
}

export function addItem(item) {
  return {
    type: ADD_ITEM,
    item
  }
}

export function deleteItem(item) {
  return {
    type: DELETE_ITEM,
    item
  }
}

export function toggleItemCompletion(item) {
  return {
    type: TOGGLE_ITEM_COMPLETION,
    item
  }
}


// auth
export function startListeningToAuth() {
  (dispatch, getState) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user, 'the user in startListeningToAuth')
        // User signed in
        dispatch({
          type: LOGIN_USER,
          uid: user.uid,
          username: 'test'
        })
      } else {
        // User not logged in
        if (getState().get('auth').get('currently') !== 'ANONYMOUS') {
          dispatch({
            type: LOGOUT
          });
        }
      }
    });
  }
}

export function login(email, password) {
  dispatch => {
    dispatch({type: ATTEMPT_LOGIN});
    firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
      if (error) {
        dispatch({
          type: LOGIN_ERROR,
          error
        });
        dispatch({
          type: LOGOUT
        });
      } else {
        // Auth listener will take care of this part, do nothing.
      }
    });
  }
}

export function logout() {
  dispatch => {
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
