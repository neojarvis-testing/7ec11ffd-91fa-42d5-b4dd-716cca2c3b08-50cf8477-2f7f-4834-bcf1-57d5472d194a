package com.examly.springapp.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

import java.util.*;

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
    // @PostMapping("/api/login")
    // public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO) {
    //     boolean isAuthenticated = userService.loadUserByUsername(loginDTO.); // Authentication logic
    //     if (isAuthenticated) {
    //         return ResponseEntity.status(200).body(loginDTO); // Status 200 (OK)
    //     } else {
    //         return ResponseEntity.status(400).body("Invalid login credentials."); // Status 400 (Bad Request)
    //     }
    // }

    @GetMapping("/api/user")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAllUsers();
        return ResponseEntity.status(200).body(users);
    }

    @PutMapping("/api/user/view/profile")
    public ResponseEntity<?> updateUserDetails(@RequestBody User user) {
        User updatedUser = userService.updateUser(user); 
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
