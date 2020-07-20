import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import {
  Container,
  Form,
  FormGroup,
  Button,
  Label,
  Input,
  Table
} from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import './App.css';

import AppNav from './AppNav.js';

class Expenses extends Component {
  emptyItem = {
    expenseDate: new Date(),
    description: '',
    location: '',
    category: {
      id: 0,
      name: ''
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      isLoading: true,
      expenses: [],
      categories: [],
      item: this.emptyItem
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.removeExpense = this.removeExpense.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  handleDateChange = date => {
    this.setState({
      startDate: date
    });
    let item = {...this.state.item};
    item.expenseDate = date;
    this.setState({ item });
  };

  async componentDidMount() {
    if(localStorage.getItem('jwt') === null)
      return;
    const jwt = localStorage.getItem('jwt');
    console.log(jwt);
    const categoriesResponse = await axios.get('/api/categories', {
      headers: {
        'Authorization': 'Bearer ' + jwt
      }
    });
    const expensesResponse = await axios.get('/api/expenses', {
      headers: {
        'Authorization': 'Bearer ' + jwt
      }
    });
    this.setState({
      isLoading: false,
      categories: categoriesResponse.data,
      expenses: expensesResponse.data
    })
    console.log(this.state.categories);
    if(this.state.categories && this.state.categories.length > 0) {
      this.emptyItem.category.id = this.state.categories[0].id;
      this.emptyItem.category.name = this.state.categories[0].name;
    }
  }

  async removeExpense(id) {
    const jwt = localStorage.getItem('jwt');
    await axios.delete('/api/expense/' + id, {
      headers: {
        'Authorization': 'Bearer ' + jwt
      }
    });
    let updatedExpenses = [...this.state.expenses].filter(i => i.id !== id);
    this.setState({
      expenses: updatedExpenses
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;
    const jwt = localStorage.getItem('jwt');
    console.log(jwt);
    const response = await axios.post('/api/expense', item, {
      headers: {
        'Authorization': 'Bearer ' + jwt
      }
    });
    console.log(response.data.id);
    this.setState({
      expenses: [...this.state.expenses, response.data],
      item: this.emptyItem
    })
    this.props.history.push('/expenses');
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({ item });
  }

  handleCategoryChange(event) {
    const target = event.target;
    const value = target.value;
    const id = Number(target[target.selectedIndex].id);
    let item = {...this.state.item};
    item.category.name = value;
    item.category.id = id;
    console.log(item);
    this.setState({ item });
  }

  render() {
    if(localStorage.getItem('jwt') === null)
      return <Redirect to='/login' />;

    if(this.state.isLoading)
      return(
        <div>
        <AppNav />
        <p>loading......</p>
        </div>
      )

    return (
      <div>
        <AppNav />
        <Container>
          <h3>Add Expense</h3>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input type="text" name="description" id="description" onChange={this.handleChange} autoComplete="name" />
            </FormGroup>
            <FormGroup>
              <Label for="category">Category</Label>{' '}
              <Input type="select" name="select" id="exampleSelect" onChange={this.handleCategoryChange}>
                {
                  this.state.categories.map( category =>
                    <option key={category.id} id={category.id}>
                      {category.name}
                    </option>
                  )
                }
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="expenseDate">Expense Date</Label>{' '}
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleDateChange}
              />
            </FormGroup>
            <div className="row">
              <FormGroup className="col-md-4 mb-3">
                <Label for="location">Location</Label>
                <Input type="text" name="location" id="location" onChange={this.handleChange} />
              </FormGroup>
            </div>
            <FormGroup>
              <Button color="primary" type="submit">Save</Button>{' '}
              <Button color="secondary" tag={Link} to="/">Cancel</Button>
            </FormGroup>
          </Form>
        </Container>

        <Container>
          <h3>Expense List</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Description</th>
                <th width="20%">Location</th>
                <th width="20%">Date</th>
                <th>Category</th>
                <th width="10%">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.expenses.map( expense =>
                  <tr key={expense.id}>
                    <td key={expense.id + "ds"}>{expense.description}</td>
                    <td key={expense.id + "loc"}>{expense.location}</td>
                    <td key={expense.id + "date"}><Moment date={expense.expenseDate} format="YYYY/MM/DD" /></td>
                    <td key={expense.id + "name"}>{expense.category.name}</td>
                    <td key={expense.id + "bt"}><Button size="sm" color="danger" onClick={() => this.removeExpense(expense.id)}>Delete</Button></td>
                  </tr>
                )
              }
            </tbody>
          </Table>
        </Container>
      </div>
    )
  }
}

export default Expenses;
