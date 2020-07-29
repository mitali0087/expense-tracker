package com.expensetracker.backend.controller;

import com.expensetracker.backend.model.User;
import com.expensetracker.backend.model.UserRegistrationDTO;
import com.expensetracker.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

@RestController
public class RegistrationController {

  @Autowired
  private UserRepository userRepository;

//  @GetMapping("/api/user/{id}")
//  ResponseEntity<?> getUserInformation(@PathVariable int id) {
//    Optional<User> user = userRepository.findById(id);
//    return user.map(response -> ResponseEntity.ok().body(response))
//      .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
//  }

  @Autowired
  private PasswordEncoder passwordEncoder;

  @PostMapping("/api/user/registration")
  ResponseEntity<?> addUser(@Valid @RequestBody UserRegistrationDTO userRegistrationDTO) throws URISyntaxException {
    User newUser = new User();
    newUser.setUsername(userRegistrationDTO.getUsername());
    newUser.setPassword(passwordEncoder.encode(userRegistrationDTO.getPassword()));
    newUser.setRole("ROLE_USER");
    User result = userRepository.save(newUser);
    return ResponseEntity.created(new URI("/api/user/" + result.getId())).body(result);
  }

}
