"use strict";

import React, { Component } from "react";
import reqwest from 'reqwest';

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
    if (!item) {
      alert('You must enter an item!');
    } else {
      let newItems = this.state.items,
        itemsCnt = Object.keys(newItems).length,
        newItemId = itemsCnt + 1;

      // Add to the object
      newItems[newItemId] = {
        label: item,
        completed: false,
        deleted: false
      }

      // Reset the state to show new items
      this.setState({
        items: newItems
      })
    }
  }

  deleteItem(itemId) {
    let confirmation = confirm('Are you sure you want to delete this item?')
    if (confirmation) {

      // Delete the item
      let newItems = this.state.items;
      delete newItems[itemId];

      // Reset the state to show new items
      this.setState({
        items: newItems
      })
    }
  }

  toggleItemComplete(itemId) {
    // Toggle the item, clicked or otherwise
    if (this.state.items && (this.state.items).hasOwnProperty(itemId)) {
      let newItems = this.state.items,
        itemCompleted = newItems[itemId].completed;
      newItems[itemId].completed = !itemCompleted;

      // Reset the state to show new items
      this.setState({
        items: newItems
      })
    }
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
