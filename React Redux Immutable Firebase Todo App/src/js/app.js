'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import store from './store';
import { startListeningToAuth } from './actions';

// Start up rthe Firebase
require('../../fb-config.js');

// Page containers.. (smart components)
import Template from './pages/Template';
import Home from './pages/Home/container';
import Register from './pages/Register/container';

// Start the auth listener
store.dispatch(startListeningToAuth());

render((
  <Provider store={store}>
    <Router history={browserHistory}>
  		<Route component={Template}>
  			<Route path="/" component={Home}/>
  			<Route path="/register" component={Register}/>
  		</Route>
    </Router>
  </Provider>
), document.getElementById('app'));
