package com.examly.springapp.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

import java.util.*;

import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;
import com.examly.springapp.service.UserService;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    // @PostMapping("/api/register")
    // public ResponseEntity<?> createUser(@RequestBody User user) {
    //     User savedUser = userService.createUser(user); 
    //     return ResponseEntity.status(201).body(savedUser); 
    // }

    //review again
        @PostMapping("/api/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO) {
        try {
            // Retrieve the user details using the username
            User user = userService.loadUserByUsername(loginDTO.getUsername());

            if (user.getPassword().equals(loginDTO.getToken())) { // Assuming "token" represents the password
                return ResponseEntity.status(200).body(user); // Returning the User object directly
            } else {
                return ResponseEntity.status(400).body("Invalid login credentials."); // Status 400 (Bad Request)
            }
        } catch (UsernameNotFoundException e) {
            // Handle the exception and return a meaningful response
            return ResponseEntity.status(404).body("User not found: " + e.getMessage()); // Status 404 (Not Found)
        }
    }

    
    @GetMapping("/api/user")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAllUsers();
        return ResponseEntity.status(200).body(users);
    }

    @PutMapping("/api/user/view/{userId}")
    public ResponseEntity<?> updateUserDetails(@PathVariable int userId,@RequestBody User user) {
        User updatedUser = userService.updateUser(userId,user); 
        return ResponseEntity.status(200).body(updatedUser);
    }

    // @GetMapping("/api/user/{userId}")
    // public ResponseEntity<?> getUserById(@PathVariable int userId) {
    //     User user = userService.getByUserId(userId); 
    //     if (user != null) {
    //         return ResponseEntity.status(200).body(user); 
    //     } else {
    //         return ResponseEntity.status(403).body("Access is forbidden."); 
    //     }
    // }

    @DeleteMapping("/api/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable int id) {
        userService.deleteUser(id); 
        return ResponseEntity.status(204).build(); 
       
    }

    @GetMapping("/api/name/{name}")
    public ResponseEntity<?> getUserByName(@PathVariable String name) {
        User user = userService.getUserByName(name).get(); 
        if (user != null) {
            return ResponseEntity.status(200).body(user); 
        } else {
            return ResponseEntity.status(404).body("User not found.");
        }
    }

}
