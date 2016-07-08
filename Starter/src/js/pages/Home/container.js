"use strict";

import React, { Component } from "react";
import { connect } from 'react-redux';

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
    return <Home />
  }
}

// Create the Redux container
const mapStateToProps = (state) => {
  let sectionState = state.app;
  return {}
}

const mapDispatchToProps = (dispatch, props) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
