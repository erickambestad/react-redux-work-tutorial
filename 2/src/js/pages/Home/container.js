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

    let {
      item,
      items,
      deleteItem,
      toggleItemCompletion,
      updateItem,
      addItem
    } = this.props;

    return <Home
      item={item}
      items={items}
      deleteCallback={deleteItem}
      toggleCallback={toggleItemCompletion}
      updateCallback={updateItem}
      addCallback={addItem}
    />
  }
}

// Create the Redux container
const mapStateToProps = (state) => {
  let sectionState = state.app;
  return {
    loading: sectionState.get('loading'),
    items: sectionState.get('items'),
    item: sectionState.get('item')
  }
}

// Actions
import {
  loadItems,
  addItem,
  updateItem,
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
    updateItem: (item, text) => {
      dispatch(updateItem(item, text))
    },
    deleteItem: (item) => {
      dispatch(deleteItem(item))
    },
    toggleItemCompletion: (item) => {
      dispatch(toggleItemCompletion(item))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
