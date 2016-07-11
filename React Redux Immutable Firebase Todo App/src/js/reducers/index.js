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
        .setIn(['uid'], null)
        .setIn(['error'], null)
      return state.setIn(['auth'], newAuth);
    break;
    case LOGIN_USER:
      auth = state.get('auth'),
      newAuth = auth
        .setIn(['currently'], 'LOGGED_IN')
        .setIn(['username'], action.username)
        .setIn(['uid'], action.uid)
          .setIn(['error'], null)
      return state.setIn(['auth'], newAuth);
    break;
    case LOGIN_ERROR:
      let error = (action.error) ? action.error : null
      auth = state.get('auth'),
      newAuth = auth
        .setIn(['currently'], 'ANONYMOUS')
        .setIn(['username'], 'guest')
        .setIn(['uid'], null)
        .setIn(['error'], error)
      return state.setIn(['auth'], newAuth);
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
    default:
      return state;
  }
};
