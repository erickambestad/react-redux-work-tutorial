"use strict";

/**
 * Actions are payloads of information that send data from your application to your store.
 * They are the only source of information for the store. You send them to the store using store.dispatch().
 *
 * Actions are plain JavaScript objects. Actions must have a type property that indicates the type of action being performed.
 * Types should typically be defined as string constants.
 */


import reqwest from 'reqwest';

import {
  REQUEST_ITEMS,
  RECIEVE_ITEMS,
  UPDATE_ITEM,
  ADD_ITEM,
  DELETE_ITEM,
  TOGGLE_ITEM_COMPLETION
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
