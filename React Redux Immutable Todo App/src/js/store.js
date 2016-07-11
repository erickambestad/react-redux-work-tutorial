"use strict";

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
const logger = createLogger();

import reducers from './reducers';

export default createStore(
    combineReducers({
      app: reducers
    }), {},
    applyMiddleware(
      thunkMiddleware,
      logger
    )
);
