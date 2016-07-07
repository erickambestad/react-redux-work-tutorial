"use strict";

import React, { Component } from "react";
import reqwest from 'reqwest';
import uuid from 'node-uuid';

// Import dumb components
import Home from './';

class HomeContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: []
    }
  }

  componentDidMount() {
    this.loadItems()
  }

  loadItems() {
    reqwest('/api/list.json', (items) => {
      this.setState({
        items: items
      })
    });
  }

  addCallback(item) {
    // Check for item, if they input something, add it
    let newItems = this.state.items;

    // Add to the object
    newItems.push({
      id: uuid.v4(),
      label: item,
      completed: false,
      deleted: false
    })

    // Reset the state to show new items
    this.setState({
      items: newItems
    })
  }

  deleteItem(itemId) {
    // Delete the item
    let newItems = this.state.items.map((item) => {
      if (item.id === itemId) {
        item.deleted = true;
      }
      return item;
    });

    // Reset the state to show new items
    this.setState({
      items: newItems
    })
  }

  toggleItemComplete(itemId) {
    // Toggle the item, clicked or otherwise
    let newItems = this.state.items.map((item) => {
      if (item.id === itemId) {
        item.completed = !item.completed;
      }
      return item;
    });

    // Reset the state to show new items
    this.setState({
      items: newItems
    })
  }

  render() {
    return <Home
      items={this.state.items}
      deleteCallback={this.deleteItem.bind(this)}
      toggleCallback={this.toggleItemComplete.bind(this)}
      addCallback={this.addCallback.bind(this)}
    />
  }
}

export default HomeContainer;
