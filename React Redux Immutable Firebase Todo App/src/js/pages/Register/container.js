"use strict";

import React from "react";
import { browserHistory } from 'react-router';
import firebase from 'firebase';

import Register from '../../components/Auth/Register';

class RegisterContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  registerUser(userObj) {
    let userKey = firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password).then(() => {
      // User registered and signed in.
      browserHistory.push('/');
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  render() {
    return(
      <Register registerCallback={this.registerUser} />
    );
  }
}

export default RegisterContainer;
