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
