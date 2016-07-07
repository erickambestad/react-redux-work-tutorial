"use strict";

import React, { Component } from "react";

import List from '../../components/List';

class Home extends Component {

  constructor(props) {
    super(props);
  }

  updateText(e) {
    e.preventDefault()

    let {
      updateCallback
    } = this.props;

    updateCallback(this.refs.item.value);
  }

  render() {

    let {
      items,
      item,
      addCallback,
      deleteCallback,
      toggleCallback
    } = this.props;

    return(
      <div className="col-md-6 col-md-offset-3">
        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">Sample to-do list yah</h3>
          </div>
          <List items={items} deleteCallback={deleteCallback} toggleCallback={toggleCallback}/>
        </div>
        <form className="form-horizontal" onSubmit={e => e.preventDefault()}>
          <div className="form-group">
            <div className="col-sm-9">
              <input ref="item" type="text" className="form-control" placeholder="Add a new item.." value={item} onChange={this.updateText.bind(this)} />
            </div>
            <div className="col-sm-3">
              <button type="button" className="btn btn-primary btn-block" disabled={!item} onClick={addCallback.bind(null, item)}>Add</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Home;
