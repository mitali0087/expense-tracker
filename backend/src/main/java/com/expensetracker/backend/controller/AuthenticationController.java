package com.expensetracker.backend.controller;

import com.expensetracker.backend.model.AuthenticationResponse;
import com.expensetracker.backend.model.UserAuthenticationDTO;
import com.expensetracker.backend.services.MyUserDetailsService;
import com.expensetracker.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private MyUserDetailsService myUserDetailsService;

  @Autowired
  private JwtUtil jwtUtil;

  @PostMapping("/api/user/authenticate")
  public ResponseEntity<?> authenticateUser(@RequestBody UserAuthenticationDTO userAuthenticationDTO) throws Exception {
    try {
      authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(userAuthenticationDTO.getUsername(), userAuthenticationDTO.getPassword())
      );
    } catch (BadCredentialsException e) {
      throw new Exception("Incorrect username or password");
    }
    final UserDetails userDetails = myUserDetailsService.loadUserByUsername(userAuthenticationDTO.getUsername());
    final String jwt = jwtUtil.generateToken(userDetails);

    return ResponseEntity.ok(new AuthenticationResponse(jwt));
  }

}
