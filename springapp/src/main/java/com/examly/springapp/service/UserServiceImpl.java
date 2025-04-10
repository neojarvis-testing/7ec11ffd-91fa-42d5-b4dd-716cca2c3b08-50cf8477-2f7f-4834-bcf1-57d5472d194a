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
    private AuthenticationManager authManager ;

    @Autowired
    private PasswordEncoder passwordEncoder ; 

    @Autowired
    private JwtUtils JwtUtils;

    @Override
    public User createUser(User user) {
        return userRepo.save(user);
    }


    @Override
    public User loadUserByUsername(String userName) {
        User user = userRepo.findByUserName(userName);
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
    public AuthUser loginUser(LoginDTO user) {
        Authentication authentication = authManager.authenticate(
            new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
            );
        if(authentication.isAuthenticated()){
        List<String> roleList=authentication.getAuthorities().stream().map(r->r.getAuthority()).collect(Collectors.toList());
        if(roleList.isEmpty()){
            throw new IllegalStateException("User has no role");
        }
        String role=roleList.get(0);
        AuthUser authUser=new AuthUser();
        authUser.setUserName(user.getUsername());
        authUser.setToken(JwtUtils.generateToken(user.getUsername()));
        authUser.setRole(role);
        authUser.setUserId(userRepo.findUserIdByUsername(user.getUsername()));
        // authUser.setName(userRepo.findUserRoleByUsername(user.getUsername()));
        return authUser;
       }
       else{
        throw new InvalidCredentialsException("Invalid User Name or Password");
       }

    
    }

}
