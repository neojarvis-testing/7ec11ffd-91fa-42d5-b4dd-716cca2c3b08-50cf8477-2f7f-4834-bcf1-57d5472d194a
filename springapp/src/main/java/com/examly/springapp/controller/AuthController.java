package com.examly.springapp.controller;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.config.JwtUtils;
import com.examly.springapp.exceptions.InvalidCredentialsException;
import com.examly.springapp.model.AuthUser;
import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;
import com.examly.springapp.service.UserServiceImpl;
 
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
 
@RestController
public class AuthController {
   
 
    @Autowired
    private UserServiceImpl userServiceImpl;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;
 
 
    @PostMapping("/api/register")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> registerUser(@RequestBody User user){
        System.out.println("User object:"+user);
        User newUser=userServiceImpl.registerUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

    // Get All Users
    // @GetMapping("/api/users")
    // public ResponseEntity<?> getAllUsers() {
    //     try {
    //         List<User> users = userServiceImpl.findAllUsers();
    //         return ResponseEntity.status(200).body(users); // OK
    //     } catch (Exception e) {
    //         return ResponseEntity.status(400).body(e.getMessage()); // Bad Request
    //     }
    // }
 
 
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
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO user){
        Authentication authentication=authenticationManager
                                                .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword()));
        if(authentication.isAuthenticated()){

            User responsUser=userServiceImpl.loadUserByUsername(user.getUsername());

            LoginDTO response=new LoginDTO();

            response.setToken((jwtUtils.generateToken(user.getUsername())));
            response.setUserId(responsUser.getUserId());
            response.setUsername(responsUser.getUsername());
            response.setUserRole(responsUser.getUserRole());

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }
        else{
            throw new UsernameNotFoundException("invalid user request...!");
        }
    }
}
