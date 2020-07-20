package com.expensetracker.backend.controller;



import com.expensetracker.backend.model.Category;
import com.expensetracker.backend.model.User;
import com.expensetracker.backend.repository.CategoryRepository;
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
public class CategoryController {

  @Autowired
  private CategoryRepository categoryRepository;

  @Autowired
  private JwtUtil jwtUtil;

  @Autowired
  private UserRepository userRepository;

//  @GetMapping("/categories")
//  Collection<Category> getCategories() {
//    return categoryRepository.findAll();
//  }

  @GetMapping("/category/{id}")
  ResponseEntity<?> getCategoryById(@PathVariable Long id) {
    Optional<Category> category = categoryRepository.findById(id);
    return category
      .map(response -> ResponseEntity.ok().body(response))
      .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
  }

//  @PostMapping("/category")
//  ResponseEntity<?> addCategory(@Valid @RequestBody Category category) throws URISyntaxException {
//    Category result = categoryRepository.save(category);
//    return ResponseEntity.created(new URI("/api/category/" + result.getId())).body(result);
//  }

  @PutMapping("/category/{id}")
  ResponseEntity<?> updateCategory(@Valid @RequestBody Category category) {
    Category result = categoryRepository.save(category);
    return ResponseEntity.ok().body(result);
  }

  @DeleteMapping("/category/{id}")
  ResponseEntity<?> deleteCategory(@PathVariable Long id) {
    categoryRepository.deleteById(id);
    return ResponseEntity.ok().build();
  }

  @GetMapping("/categories")
  Collection<Category> getCategories(@RequestHeader("Authorization") String authorizationHeader){
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

      Optional<List<Category>> expenses = user
        .map(ele -> categoryRepository.findAllByUser(ele))
        .orElse(null);

      List<Category> result = new ArrayList<>();
      expenses.ifPresent(e -> result.addAll(e));
      return result;
    }

    return new ArrayList<>();
  }

  @PostMapping("/category")
  ResponseEntity<?> addCategory
    (@RequestHeader("Authorization") String authorizationHeader, @Valid @RequestBody Category category)
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

      user.ifPresent(u -> category.setUser(u));
      Category result = categoryRepository.save(category);
      return ResponseEntity.created(new URI("/api/category/" + result.getId())).body(result);
    }

    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  }
}
