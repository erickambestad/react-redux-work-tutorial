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

  componentDidMount() {
    this.props.loadItems()
  }

  render() {

    let {
      item,
      items,
      deleteItem,
      toggleItemCompletion,
      updateItem,
      addItem,
      auth,
      login,
      logout
    } = this.props;

    if (auth && auth.has('currently')) {
      switch (auth.get('currently')) {
        case 'ANONYMOUS':
          return <Login loginCallback={login} error={(auth && auth.has('error')) ? auth.get('error') : null} />
        break;
        case 'AWAITING_AUTH_RESPONSE':
          return <Loader />
        break;
        default:
          return <Home
            item={item}
            items={items}
            deleteCallback={deleteItem}
            toggleCallback={toggleItemCompletion}
            updateCallback={updateItem}
            addCallback={addItem}
            logoutCallback={logout}
          />
      }
    } else {
      return <Loader />
    }

    return component;

    return (auth && auth.has('currently') && auth.get('currently') !== 'ANONYMOUS')
      ? <Home
        item={item}
        items={items}
        deleteCallback={deleteItem}
        toggleCallback={toggleItemCompletion}
        updateCallback={updateItem}
        addCallback={addItem}
        logoutCallback={logout}
      />
    : <Login loginCallback={login} error={(auth && auth.has('error')) ? auth.get('error') : null} />
  }
}

// Create the Redux container
const mapStateToProps = (state) => {
  let sectionState = state.app;
  return {
    loading: sectionState.get('loading'),
    items: sectionState.get('items'),
    item: sectionState.get('item'),
    auth: sectionState.get('auth')
  }
}

// Actions
import {
  loadItems,
  addItem,
  updateItem,
  deleteItem,
  toggleItemCompletion,
  login,
  logout
} from '../../actions';

const mapDispatchToProps = (dispatch, props) => {
  return {
    loadItems: () => {
      dispatch(loadItems())
    },
    addItem: (item) => {
      dispatch(addItem(item))
    },
    updateItem: (item) => {
      dispatch(updateItem(item))
    },
    deleteItem: (item) => {
      dispatch(deleteItem(item))
    },
    toggleItemCompletion: (item) => {
      dispatch(toggleItemCompletion(item))
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
