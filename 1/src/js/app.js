'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

// Page containers.. (smart components)
import Template from './pages/Template';
import Home from './pages/Home/container'

render((
  <Router history={browserHistory}>
		<Route component={Template}>
			<Route path="/" component={Home}/>
		</Route>
  </Router>
), document.getElementById('app'));
