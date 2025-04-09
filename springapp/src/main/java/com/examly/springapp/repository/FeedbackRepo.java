package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Feedback;

@Repository
public interface FeedbackRepo extends JpaRepository<Feedback,Long> {
    
    
    @Query("SELECT f FROM Feedback f WHERE f.user.id = :userId")
    public List<Feedback> findByUserId(Long userId);
    
}
