package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;

import jakarta.persistence.EntityNotFoundException;


@Service

public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepo userRepo;

    @Override
    public User createUser(User user) {
        return userRepo.save(user);
    }

    //review again
    @Override
    public User loadUserByUsername(String userName) {
        return userRepo.findByUserName(userName);


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

    @Override
    public User updateUser(User user) {
        Optional<User> opt=userRepo.findById(user.getUserId());
        if(opt.isEmpty()){
            throw new EntityNotFoundException("UserId not found");
        }
        return userRepo.save(user);
    }

    @Override
    public Optional<User> getUserByName(String name) {
        return userRepo.getUserByName(name);
    }

    
}
