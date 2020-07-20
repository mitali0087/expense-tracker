import React, {Component} from 'react';

import AppNav from './AppNav.js'

class Home extends Component {
  state = {}
  render() {
    return(
      <div>
        <AppNav />
        <h2 style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
          <small className="text-muted">Welcome to</small>&nbsp;Easy Expense Tracker!
        </h2>
      </div>
    )
  }
}

export default Home;
