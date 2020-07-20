package com.expensetracker.backend.model;

import com.sun.istack.NotNull;

public class UserRegistrationDTO {

  @NotNull
  private String username;
  @NotNull
  private String password;

  public UserRegistrationDTO() {
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }
}

