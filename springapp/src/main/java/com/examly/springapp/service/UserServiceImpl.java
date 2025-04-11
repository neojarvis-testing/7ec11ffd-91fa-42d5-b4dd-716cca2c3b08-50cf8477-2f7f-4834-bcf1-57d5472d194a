package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.Authentication;

import org.springframework.stereotype.Service;

import com.examly.springapp.exceptions.*;
import com.examly.springapp.model.AuthUser;
import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;

import jakarta.persistence.EntityNotFoundException;
import com.examly.springapp.config.JwtUtils;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AuthenticationManager authenticationManager ;

    @Autowired
    private PasswordEncoder passwordEncoder ; 



    @Override
    public User registerUser(User user){
        Optional<User> opt= userRepo.findByUserName(user.getUsername());  
        if(opt.isPresent()){
            throw new DuplicateUserException("User already exists.");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User newUser = userRepo.save(user);
        return newUser ; 
    }


    @Override
    public User loadUserByUsername(String userName) {
        User user = userRepo.findByUserName(userName).get();
        if (user == null) {
            throw new EntityNotFoundException("User not found with username: " + userName);
        }
        return user;
    }

    @Override
    public List<User> findAllUsers() {
       return userRepo.findAll();
    }

    @Override
    public User getByUserId(int userId) {
        Optional<User> opt=userRepo.findById(userId);
        if(opt.isEmpty()){
            throw new EntityNotFoundException("UserId not found");
        }
        return opt.get();
    }

    @Override
    public void deleteUser(int userId) {
        userRepo.deleteById(userId);
    }

    public User updateUser(int userId, User user) {
        Optional<User> opt = userRepo.findById(userId);
        if (opt.isEmpty()) {
            throw new EntityNotFoundException("UserId not found");
        }
        user.setUserId(userId); 
        return userRepo.save(user);
    }


    @Override
    public Optional<User> getUserByName(String name) {
        return userRepo.getUserByName(name);
    }


    @Override
    public User createUser(User user) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createUser'");
    }


    @Override
    public AuthUser loginUser(LoginDTO user) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'loginUser'");
    }

}
