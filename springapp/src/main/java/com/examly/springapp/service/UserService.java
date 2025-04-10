package com.examly.springapp.service;

import com.examly.springapp.model.AuthUser;
import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;

import java.util.*;

public interface UserService {
    public User createUser(User user);
    public User loadUserByUsername(String userName);
    public List<User> findAllUsers();
    public User getByUserId(int userId);
    public void deleteUser(int userId);
    public User updateUser(User user);
    public Optional<User> getUserByName(String name);
    public AuthUser loginUser(LoginDTO user);
    public User registerUser(User user);
}
