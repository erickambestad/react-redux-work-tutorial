"use strict";

import React, { Component } from "react";
import { connect } from 'react-redux';
import reqwest from 'reqwest';

// Import dumb components
import Home from './';
import Login from '../../components/Auth/Login';
import Loader from '../../components/Loader';

class HomeContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    let {
      items,
      startListeningToItems,
      auth,
      login,
      logout
    } = this.props;

    if (auth && auth.has('currently')) {
      switch (auth.get('currently')) {
        // Not logged in, show the login form
        case 'ANONYMOUS':
          return <Login loginCallback={login} error={(auth && auth.has('error')) ? auth.get('error') : null} />
        break;
        // Trying to log in, show the loader
        case 'AWAITING_AUTH_RESPONSE':
          return <Loader />
        break;
        // Logged in, show the page
        default:
          return <Home
            items={items}
            itemListener={startListeningToItems}
            logoutCallback={logout}
          />
      }
    } else {
      return <Loader />
    }

    return component;
  }
}

// Create the Redux container
const mapStateToProps = (state) => {
  let sectionState = state.app;
  return {
    loading: sectionState.get('loading'),
    items: sectionState.get('items'),
    auth: sectionState.get('auth')
  }
}

// Actions
import {
  startListeningToItems,
  login,
  logout
} from '../../actions';

const mapDispatchToProps = (dispatch, props) => {
  return {
    startListeningToItems: () => {
      dispatch(startListeningToItems())
    },
    login: (email, password) => {
      dispatch(login(email, password))
    },
    logout: () => {
      dispatch(logout())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
