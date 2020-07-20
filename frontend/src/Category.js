import React, { Component } from 'react';
import axios from 'axios';
import { Col, Table, Container,
FormGroup, Form, Label, Input, Button
} from 'reactstrap';
import { Redirect } from "react-router-dom";

import AppNav from './AppNav.js'

class Category extends Component {
  emptyCatgory = {
    name: ''
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      categories: [],
      item: this.emptyCatgory
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeCategory = this.removeCategory.bind(this);
  }

  async componentDidMount() {
    if(localStorage.getItem('jwt') === null)
      return;
    const jwt = localStorage.getItem('jwt');
    const response = await axios.get('/api/categories', {
      headers: {
        'Authorization': 'Bearer ' + jwt
      }
    });
    this.setState({
      isLoading: false,
      categories: response.data,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const item = this.state.item;
    const jwt = localStorage.getItem('jwt');
    const response = await axios.post('/api/category', item, {
      headers: {
        'Authorization': 'Bearer ' + jwt
      }
    });
    console.log(response.data.id);
    this.setState({
      categories: [...this.state.categories, response.data],
      item: this.emptyItem
    })
    this.props.history.push('/categories');
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    console.log(item);
    this.setState({ item });
  }

  async removeCategory(id) {
    const jwt = localStorage.getItem('jwt');
    await axios.delete('/api/category/' + id, {
      headers: {
        'Authorization': 'Bearer ' + jwt
      }
    });
    let updatedCategories = [...this.state.categories].filter(i => i.id !== id);
    this.setState({
      categories: updatedCategories
    });
  }

  render() {
    if(localStorage.getItem('jwt') === null)
      return <Redirect to='/login' />;

    if(this.state.isLoading)
      return (
        <div>
          <AppNav />
          <p>loading......</p>
        </div>
      )
    return (
      <div>
        <AppNav />
        <Container>
          <h2>Add Category</h2>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="new category">New Category</Label>
              <Col sm="6">
                <Input type="textarea" name="name" onChange={this.handleChange} />
              </Col>
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </Container>
        <Container>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="90%">Catgory</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.categories.map( category =>
                  <tr key={category.id}>
                    <td key={category.id + 'name'}>{category.name}</td>
                    <td key={category.id + 'btn'}><Button size="sm" color="danger" onClick={() => this.removeCategory(category.id)}>Delete</Button></td>
                  </tr>
                )
              }
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default Category;
