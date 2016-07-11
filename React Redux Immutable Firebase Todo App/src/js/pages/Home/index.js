"use strict";

import React, { Component } from "react";
import uuid from 'node-uuid';

import List from '../../components/List';

class Home extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let {
      itemListener
    } = this.props;

    itemListener();
  }

  addItem(e) {
    e.preventDefault();

    // Check for user since we'll need their db key
    let user = firebase.auth().currentUser;

    // If the user exists, move on.
    if (user && user.uid) {
      let newItem = {
        id: uuid.v4(),
        label: this.refs.item.value,
        completed: false,
        deleted: false
      }
      // Push the new item in to the DB.. will automatically update
      let saved = firebase.database()
        .ref()
        .child('items')
        .child(user.uid)
        .push(newItem)

      // If successful, clear out the form input
      if (saved) {
        this.refs.item.value = '';
      }
    }
  }

  deleteItem(key) {
    // Check for user since we'll need their db key
    let user = firebase.auth().currentUser;

    // If the user and key exists, move on.
    if (user && user.uid && key) {
      firebase.database()
        .ref()
        .child('items')
        .child(user.uid)
        .child(key)
        .remove().then(() => {
          console.log('success')
        }).catch((error) => {
          console.log('Failed.. ' + error.message)
        })
    }
  }

  render() {

    let {
      items,
      item,
      addCallback,
      deleteCallback,
      toggleCallback,
      logoutCallback
    } = this.props;

    return(
      <div className="col-md-6 col-md-offset-3">
        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">
              <span>Sample to-do list yah</span>
              <a href="#" className="pull-right" onClick={(e) => {
                  e.preventDefault();
                  logoutCallback();
                }}>Logut</a>
            </h3>
          </div>
          <List items={items} deleteCallback={this.deleteItem} toggleCallback={()=>{}}/>
        </div>
        <form onSubmit={this.addItem.bind(this)} className="form-horizontal">
          <div className="form-group">
            <div className="col-sm-9">
              <input ref="item" type="text" className="form-control" placeholder="Add a new item.." />
            </div>
            <div className="col-sm-3">
              <button type="submit" className="btn btn-primary btn-block">Add</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Home;
