"use strict";

/**
 * Actions describe the fact that something happened, but don’t specify how the application’s state changes in response.
 * This is the job of a reducer.
 *
 * It’s called a reducer because it’s the type of function you would pass to Array.prototype.reduce(reducer, initialValue).
 * It’s very important that the reducer stays pure. Things you should never do inside a reducer:
 * - Mutate its arguments;
 * - Perform side effects like API calls and routing transitions;
 * - Call non-pure functions, e.g. Date.now() or Math.random().
 */
import { fromJS, Map } from 'immutable';
import uuid from 'node-uuid';

import initialState from '../initialState';

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

export default function(state = initialState, action) {
  let auth, newAuth;
  switch(action.type) {
    case ATTEMPTING_LOGIN:
      auth = state.get('auth')
      newAuth = auth
        .setIn(['currently'], 'AWAITING_AUTH_RESPONSE')
        .setIn(['username'], 'guest')
        .setIn(['uid'], null);
      return state.setIn(['auth'], newAuth);
    break;
    case LOGIN_USER:
      auth = state.get('auth'),
      newAuth = auth
        .setIn(['currently'], 'LOGGED_IN')
        .setIn(['username'], action.username)
        .setIn(['uid'], action.uid);
      return state.setIn(['auth'], newAuth);
    break;
    case LOGIN_ERROR:
      // Implement erros on login here
      return state;
    break;
    case LOGOUT:
      auth = state.get('auth'),
      newAuth = auth
        .setIn(['currently'], 'ANONYMOUS')
        .setIn(['username'], 'guest')
        .setIn(['uid'], null);
      return state.setIn(['auth'], newAuth);
    break;
    case LOGOUT_ERROR:
      // Implement erros on logout here
      return state;
    break;
    case REQUEST_ITEMS:
      return state.setIn(['loading'], true);
    break;
    case RECIEVE_ITEMS:
      return state
        .setIn(['items'], fromJS(action.items))
        .setIn(['loading'], false);
    break;
    case UPDATE_ITEM:
      return state.setIn(['item'], action.item);
    break;
    case ADD_ITEM:
      // New item schema with defaults
      let newItem = Map({
        id: uuid.v4(),
        label: action.item,
        completed: false,
        deleted: false
      });
      // Get the next key available
      let items = state.get('items').push(newItem);
      // set the state with new list of items
      return state
        .setIn(['items'], items)
        .setIn(['item'], '')
    break;
    case DELETE_ITEM:
      //get new items and splice out the deleted
      let filteredItems = state.get('items').map(item => {
        if (item.get('id') === action.item) {
          return item.setIn(['deleted'], true);
        } else {
          return item;
        }
      })
      return state.setIn(['items'], filteredItems);
    break;
    case TOGGLE_ITEM_COMPLETION:
      let toggleableItems = state.get('items').map(item => {
        if (item.get('id') === action.item) {
          return item.setIn(['completed'], !item.get('completed'));
        } else {
          return item;
        }
      })
      return state.setIn(['items'], toggleableItems);
    break;
    default:
      return state;
  }
};
