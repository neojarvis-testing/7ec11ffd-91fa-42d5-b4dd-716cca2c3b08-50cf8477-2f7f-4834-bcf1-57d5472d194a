package com.examly.springapp.controller;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
 
import com.examly.springapp.config.JwtUtils;
import com.examly.springapp.service.UserServiceImpl;
 
@RestController
@CrossOrigin(allowedHeaders = "*",origins = "*")
public class UserController {
 
    @Autowired
    UserServiceImpl userService;
 
    @Autowired
    JwtUtils jwtUtils;
 
   
}
 