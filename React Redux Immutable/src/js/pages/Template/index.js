"use strict";

import React, { Component } from "react";

// import the bootstrap css
require('bootstrap/dist/css/bootstrap.min.css');
require('bootstrap/dist/css/bootstrap-theme.min.css');

let headerImage = require('../../../images/raptor.jpg');

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
      <div className="container">
        <div className="row">
          <div className="col-md-2 col-md-offset-4">
            <br />
            <img src={headerImage} height="300" />
          </div>
        </div>
        <br />
        <div className="row">{children}</div>
      </div>
    );
  }
}

export default Template;
