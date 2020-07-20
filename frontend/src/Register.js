import React, {Component} from 'react';
import axios from 'axios';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Button
} from 'reactstrap';

import AppNav from './AppNav.js'

class Register extends Component {

  emptyUserDetails = {
    username: "",
    password: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      userDetails: this.emptyUserDetails,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let userdetails = this.state.userDetails;
    userdetails[name] = value;
    this.setState({ userdetails });
    console.log(this.state);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const userDetails = this.state.userDetails;
    const response = await axios.post('/api/user/registration', userDetails);
    console.log(response.data);
    this.props.history.push('/register');
  }

  render() {
    return(
      <div>
        <AppNav />
        <div style={{padding: "25px"}}>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup row>
              <Label for="exampleEmail" sm={1}>Username</Label>
              <Col sm={5}>
                <Input type="username" name="username" placeholder="somethingCool" onChange={this.handleChange} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="examplePassword" sm={1}>Password</Label>
              <Col sm={5}>
                <Input type="password" name="password" placeholder="don't tell!" onChange={this.handleChange} />
              </Col>
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit">Register</Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    )
  }
}

export default Register;
