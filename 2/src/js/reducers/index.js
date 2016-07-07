"use strict";

import { fromJS, Map } from 'immutable';
import uuid from 'node-uuid';

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
        id: uuid.v4(),
        label: action.item,
        completed: false,
        deleted: false
      });
      // Get the next key available
      let items = state.get('items').push(newItem);
      // set the state with new list of items
      return state.setIn(['items'], items)
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
      return state;
    break;
    default:
      return state;
  }
};
