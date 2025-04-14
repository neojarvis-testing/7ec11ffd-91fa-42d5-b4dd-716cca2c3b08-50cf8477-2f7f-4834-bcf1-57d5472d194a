package com.examly.springapp.controller;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.examly.springapp.exceptions.InvalidCredentialsException;
import com.examly.springapp.model.AuthUser;
import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;
import com.examly.springapp.service.UserServiceImpl;
 
import jakarta.persistence.EntityNotFoundException;
 
@RestController
public class AuthController {
   
 
    @Autowired
    private UserServiceImpl userServiceImpl;
 
 
    @PostMapping("/api/register")
    public ResponseEntity<?> registerUser(@RequestBody User user){
        try{
            User addNewUser = userServiceImpl.registerUser(user);
            return ResponseEntity.status(201).body(addNewUser);
        }
        catch(EntityNotFoundException e ){
            return ResponseEntity.status(401).body(e.getMessage());
 
        }
    }
 
 
    @GetMapping("/api/user/{userId}")
    public ResponseEntity<?> getUserId(@PathVariable int userId ){
            try{
                User savedGetId = userServiceImpl.getByUserId(userId);
                return ResponseEntity.status(200).body(savedGetId);
            }
            catch(EntityNotFoundException e){
                return ResponseEntity.status(401).body(e.getMessage());
            }
    }
 
    @PostMapping("/api/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO u){
        try{    
                AuthUser loginUser = userServiceImpl.loginUser(u);
                return ResponseEntity.status(200).body(loginUser);
 
        }catch(InvalidCredentialsException e){
            return ResponseEntity.status(401).body(e.getMessage());
        }
       
    }
}
 
 