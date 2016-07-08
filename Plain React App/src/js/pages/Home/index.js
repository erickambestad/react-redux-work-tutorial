"use strict";

import React, { Component } from "react";

import List from '../../components/List';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      item: ''
    }
  }

  submitForm(e) {

    let {
      addCallback
    } = this.props;

    // Prevent the normal form submit
    e.preventDefault();

    let item = this.state.item;


    // Use the container's add function to add the new item
    addCallback(this.state.item)

    // Reset the input
    this.setState({
      item: ''
    })
  }

  itemChanged(e) {
    e.preventDefault()

    // Set the text in state so we can enable/disable the button
    this.setState({
      item: this.refs.item.value
    })
  }

  render() {

    let {
      items,
      deleteCallback,
      toggleCallback
    } = this.props;

    let disabledSubmit = this.state.item.length <= 0;

    return(
      <div className="col-md-6 col-md-offset-3">
        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">Sample to-do list yah</h3>
          </div>
          <List items={items} deleteCallback={deleteCallback} toggleCallback={toggleCallback}/>
        </div>
        <form onSubmit={this.submitForm.bind(this)} className="form-horizontal">
          <div className="form-group">
            <div className="col-sm-9">
              <input ref="item" type="text" className="form-control" placeholder="Add a new item.." value={this.state.item} onChange={this.itemChanged.bind(this)} />
            </div>
            <div className="col-sm-3">
              <button className="btn btn-primary btn-block" disabled={disabledSubmit}>Add</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Home;
