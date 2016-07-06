'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

// Pages
import Template from './pages/TemplatePage';
import Home from './pages/HomePage'

render((
  <Router history={browserHistory}>
		<Route component={Template}>
			<Route path="/" component={Home}/>
		</Route>
  </Router>
), document.getElementById('app'));
