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

import initialState from '../initialState';

export default function(state = initialState, action) {
  switch(action.type) {
    default:
      return state;
  }
};
