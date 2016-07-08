"use strict";

import React, { Component } from "react";

class Template extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    // children is where the pages will populate inside the template
    let {
      children
    } = this.props;

    return(
      <div>{children}</div>
    );
  }
}

export default Template;
