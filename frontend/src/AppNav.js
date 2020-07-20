import React, {Component} from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

class AppNav extends Component {
  state = {}
  render() {
    if(localStorage.getItem('jwt') === null) {
      return(
        <div>
          <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">Expense Tracker</NavbarBrand>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/home/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/login/">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/register/">Register</NavLink>
                </NavItem>
              </Nav>
          </Navbar>
        </div>
      );
    } else {
      return(
        <div>
          <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">Expense Tracker</NavbarBrand>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/home/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/logout/">Logout</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/categories/">Categories</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/expenses/">Expenses</NavLink>
                </NavItem>
              </Nav>
          </Navbar>
        </div>
      )
    }
  }
}

export default AppNav;
