"use strict";

import { fromJS, Map } from 'immutable';

import initialState from '../initialState';

import {
  REQUEST_ITEMS,
  RECIEVE_ITEMS,
  UPDATE_ITEM,
  ADD_ITEM,
  DELETE_ITEM,
  TOGGLE_ITEM_COMPLETION
} from '../actionTypes';

export default function(state = initialState, action) {
  switch(action.type) {
    case REQUEST_ITEMS:
      return state
        .setIn(['loading'], true);
    break;
    case RECIEVE_ITEMS:
      return state
        .setIn(['items'], fromJS(action.items))
        .setIn(['loading'], false);
    break;
    case UPDATE_ITEM:
      return state;
    break;
    case ADD_ITEM:
      // New item schema with defaults
      let newItem = Map({
        label: action.item,
        completed: false,
        deleted: false
      });
      // Get the next key available
      let itemCnt = state.get('items').size,
        nextId = itemCnt + 1,
        items = state.get('items').set(nextId, newItem);
      // set the state with new object of items
      return state.setIn(['items'], items)
    break;
    case DELETE_ITEM:
      // Set the deleted flag to true in the object
    break;
    case TOGGLE_ITEM_COMPLETION:
      return state;
    break;
    default:
      return state;
  }
};
