import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './Home.js';
import Login from './Login.js';
import Logout from './Logout.js';
import Register from './Register.js';
import Category from './Category.js';
import Expenses from './Expenses.js';

class App extends Component {
  state = {}
  render() {
    return(
      <div>
        <Router>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/home" exact={true} component={Home} />
            <Route path="/login" exact={true} component={Login} />
            <Route path="/logout" exact={true} component={Logout} />
            <Route path="/register" exact={true} component={Register} />
            <Route path="/categories" exact={true} component={Category} />
            <Route path="/expenses" exact={true} component={Expenses} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
