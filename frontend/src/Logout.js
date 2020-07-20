import React, {Component} from 'react';
import { Redirect } from "react-router-dom";

class Logout extends Component {
  render() {
    localStorage.clear('jwt');
    this.props.history.push('/logout');
    return <Redirect to='/' />;
  }
}

export default Logout;
