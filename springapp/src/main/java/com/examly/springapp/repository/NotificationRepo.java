package com.examly.springapp.repository;

import com.examly.springapp.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepo extends JpaRepository<Notification, Long> {
    List<Notification> findByUser_UserId(int userId); // Assuming the User entity has a field userId
}