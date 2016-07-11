"use strict";

import React from "react";

let loader = require('../../../images/hex-loader2.gif');

class Loader extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="text-center col-md-6 col-md-offset-3">
        <img src={loader} />
      </div>
    );
  }
}

export default Loader;
