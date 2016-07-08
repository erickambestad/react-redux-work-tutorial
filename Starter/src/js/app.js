'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

// Page containers.. (smart components)
import Template from './pages/Template';
import Home from './pages/Home/container'

render((
  <Provider store={store}>
    <Router history={browserHistory}>
  		<Route component={Template}>
  			<Route path="/" component={Home}/>
  		</Route>
    </Router>
  </Provider>
), document.getElementById('app'));
