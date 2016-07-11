"use strict";

import React from "react";

class Register extends React.Component {

  constructor(props) {
    super(props);
  }

  // Do some basic validation.  This can be done with 3rd party libraries or a million other different ways.
  validateRegistration() {
    if (!this.refs.email || !this.refs.email.value) {
      return {error: 'Email is required!'}
    }
    if (!this.refs.fname || !this.refs.fname.value) {
      return {error: 'First name is required!'}
    }
    if (!this.refs.lname || !this.refs.lname.value) {
      return {error: 'Last name is required!'}
    }
    if (!this.refs.password || !this.refs.password.value) {
      return {error: 'Password is required!'}
    }
    if (this.refs.password.value !== this.refs.confirm.value) {
      return {error: 'Passwords must match!'}
    }
    // All is well if we got here.
    return true;
  }

  render() {

    let {
      error,
      registerCallback
    } = this.props;

    return(
      <div className="login col-md-6 col-md-offset-3">
        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">Register</h3>
          </div>
          <div className="panel-body">
            {(error) ? <div className="alert alert-danger" role="alert">{error}</div> : null}
            <form onSubmit={(e)=>{
                e.preventDefault();
                let valid = this.validateRegistration();
                if (valid === true) {
                  registerCallback.call(null,{
                    email: this.refs.email.value,
                    fname: this.refs.fname.value,
                    lname: this.refs.lname.value,
                    password: this.refs.password.value
                  });
                } else {
                  if (valid.hasOwnProperty('error')) {
                    alert(valid.error)
                  }
                }
            }}>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input ref="email" id="email" type="text" className="form-control" placeholder="Email address" />
              </div>
              <div className="form-group">
                <label htmlFor="email">First name</label>
                <input ref="fname" id="fname" type="text" className="form-control" placeholder="First name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Last name</label>
                <input ref="lname" id="lname" type="text" className="form-control" placeholder="Last name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Password</label>
                <input ref="password" id="password" type="password" className="form-control" placeholder="Password" />
              </div>
              <div className="form-group">
                <label htmlFor="confirm">Confirm Password</label>
                <input ref="confirm" id="confirm" type="password" className="form-control" placeholder="Confirm Password" />
              </div>
              <button className="btn btn-primary btn-block" type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
