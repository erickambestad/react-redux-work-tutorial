"use strict";

import React from "react";

class Template extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    // children is where the pages will populate inside the template
    let {
      children
    } = this.props;

    return(
      <div>
        {children}
      </div>
    );
  }
}

export default Template;
