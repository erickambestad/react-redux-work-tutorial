"use strict";

import React from "react";

class Login extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let {
      error,
      loginCallback
    } = this.props;

    return(
      <div className="login col-md-6 col-md-offset-3">
        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">Login</h3>
          </div>
          <div className="panel-body">
            {(error) ? <div className="alert alert-danger" role="alert">{error}</div> : null}
            <form onSubmit={(e)=>{
                e.preventDefault();
                loginCallback.call(null, this.refs.email.value, this.refs.password.value);
            }}>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input ref="email" id="email" type="text" className="form-control" placeholder="Email address" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Password</label>
                <input ref="password" id="password" type="password" className="form-control" placeholder="Password" />
              </div>
              <button className="btn btn-primary btn-block" type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
