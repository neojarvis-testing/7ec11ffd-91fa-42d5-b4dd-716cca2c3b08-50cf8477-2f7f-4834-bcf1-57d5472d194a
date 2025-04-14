package com.examly.springapp.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.User;
import com.examly.springapp.service.UserServiceImpl;

import jakarta.persistence.EntityNotFoundException;
 

@RestController

public class UserController {

    @Autowired
    private UserServiceImpl userService;

    //Get All Users
    @GetMapping("/api/users")
    public ResponseEntity<?> getAllUsers() {
        try {
            List<User> users = userService.findAllUsers();
            return ResponseEntity.status(200).body(users); // OK
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage()); // Bad Request
        }
    }

    // Update User
    @PutMapping("/api/user/{userId}")
    public ResponseEntity<?> updateUser(@PathVariable int userId, @RequestBody User user) {
        try {
            User updatedUser = userService.updateUser(userId, user);
            return ResponseEntity.status(200).body(updatedUser); // OK
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage()); // Not Found
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage()); // Bad Request
        }
    }

    // Delete User
    @DeleteMapping("/api/user/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable int userId) {
        try {
            userService.deleteUser(userId);
            return ResponseEntity.status(204).body("User deleted successfully"); // No Content
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage()); // Not Found
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage()); // Bad Request
        }
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
