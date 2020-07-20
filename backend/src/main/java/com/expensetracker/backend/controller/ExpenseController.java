package com.expensetracker.backend.controller;

import com.expensetracker.backend.model.Expense;
import com.expensetracker.backend.model.User;
import com.expensetracker.backend.repository.ExpenseRepository;
import com.expensetracker.backend.repository.UserRepository;
import com.expensetracker.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ExpenseController {

  @Autowired
  private JwtUtil jwtUtil;

  @Autowired
  private ExpenseRepository expenseRepository;

  @Autowired
  private UserRepository userRepository;

//  @GetMapping("/expenses")
//  Collection<Expense> getExpenses() {
//    return expenseRepository.findAll();
//  }

//  @GetMapping("/expense/{id}")
//  ResponseEntity<?> getExpenseById(@PathVariable Long id) {
//    Optional<Expense> category = expenseRepository.findById(id);
//    return category
//      .map(response -> ResponseEntity.ok().body(response))
//      .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
//  }

//  @PostMapping("/expense")
//  ResponseEntity<?> addExpense(@Valid @RequestBody Expense expense) throws URISyntaxException {
//    Expense result = expenseRepository.save(expense);
//    return ResponseEntity.created(new URI("/api/expense/" + result.getId())).body(result);
//  }

  @PutMapping("/expense/{id}")
  ResponseEntity<?> updateExpense(@Valid @RequestBody Expense expense) {
    Expense result = expenseRepository.save(expense);
    return ResponseEntity.ok().body(result);
  }

  @DeleteMapping("/expense/{id}")
  ResponseEntity<?> deleteExpense(@PathVariable Long id) {
    expenseRepository.deleteById(id);
    return ResponseEntity.ok().build();
  }

  @GetMapping("/expenses")
  Collection<Expense> getExpenses(@RequestHeader("Authorization") String authorizationHeader){
    String username = null;
    String jwt;

    if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
      jwt = authorizationHeader.substring(7);
      username = jwtUtil.extractUsername(jwt);
    }

    if(username != null) {
      Optional<User> user = userRepository.findByUsername(username);

      if(!user.isPresent()) {
        return new ArrayList<>();
      }

      Optional<List<Expense>> expenses = user
        .map(ele -> expenseRepository.findAllByUser(ele))
        .orElse(null);

      List<Expense> result = new ArrayList<>();
      expenses.ifPresent(e -> result.addAll(e));
      return result;
    }

    return new ArrayList<>();
  }

  @PostMapping("/expense")
  ResponseEntity<?> addExpense
    (@RequestHeader("Authorization") String authorizationHeader, @Valid @RequestBody Expense expense)
    throws URISyntaxException {
    String username = null;
    String jwt;

    if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
      jwt = authorizationHeader.substring(7);
      username = jwtUtil.extractUsername(jwt);
    }

    if(username != null) {
      Optional<User> user = userRepository.findByUsername(username);

      if(!user.isPresent()) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }

      user.ifPresent(u -> expense.setUser(u));
      Expense result = expenseRepository.save(expense);
      return ResponseEntity.created(new URI("/api/expense/" + result.getId())).body(result);
    }

    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  }

}
