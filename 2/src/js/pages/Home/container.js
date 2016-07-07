"use strict";

import React, { Component } from "react";
import { connect } from 'react-redux';
import reqwest from 'reqwest';

// Import dumb components
import Home from './';

class HomeContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadItems()
  }

  render() {
    return <Home
      items={this.props.items}
      deleteCallback={this.props.deleteItem}
      toggleCallback={this.props.toggleItemCompletion}
      addCallback={this.props.addItem}
    />
  }
}

// Create the Redux container
const mapStateToProps = (state) => {
  let sectionState = state.app;
  return {
    loading: sectionState.get('loading'),
    items: sectionState.get('items')
  }
}

// Actions
import {
  loadItems,
  addItem,
  deleteItem,
  toggleItemCompletion
} from '../../actions';

const mapDispatchToProps = (dispatch, props) => {
  return {
    loadItems: () => {
      dispatch(loadItems())
    },
    addItem: (item) => {
      dispatch(addItem(item))
    },
    deleteItem: (item) => {
      dispatch(deleteItem(item))
    },
    toggleItemCompletion: () => {
      dispatch(toggleItemCompletion())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
