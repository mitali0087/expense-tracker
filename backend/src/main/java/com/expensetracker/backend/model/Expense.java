package com.expensetracker.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "expenses")
public class Expense {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  private String description;
  private Instant expenseDate;
  private String location;
  @ManyToOne(cascade = CascadeType.MERGE)
  private Category category;
  @JsonIgnore
  @ManyToOne(cascade = CascadeType.PERSIST)
  private User user;

  public Expense() {
  }

  public Expense(String description, Instant expenseDate, String location, Category category) {
    this.description = description;
    this.expenseDate = expenseDate;
    this.location = location;
    this.category = category;
  }

  public Expense(long id, String description, Instant expenseDate, String location, Category category, User user) {
    this.id = id;
    this.description = description;
    this.expenseDate = expenseDate;
    this.location = location;
    this.category = category;
    this.user = user;
  }

  public long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Instant getExpenseDate() {
    return expenseDate;
  }

  public void setExpenseDate(Instant expenseDate) {
    this.expenseDate = expenseDate;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Category getCategory() {
    return category;
  }

  public void setCategory(Category category) {
    this.category = category;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public String getLocation() {
    return location;
  }

  public void setLocation(String location) {
    this.location = location;
  }
}
