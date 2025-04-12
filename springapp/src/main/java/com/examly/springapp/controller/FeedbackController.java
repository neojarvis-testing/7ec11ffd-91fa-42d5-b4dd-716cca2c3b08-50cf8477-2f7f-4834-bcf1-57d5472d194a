package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.service.FeedbackService;

import jakarta.persistence.EntityNotFoundException;

@RestController


public class FeedbackController {
    
    @Autowired FeedbackService feedbackService;

    @PostMapping("/api/feedback")
    public ResponseEntity<?> createFeedback(@RequestBody Feedback feedback){
        try{
            Feedback savedFeedback=feedbackService.createFeedback(feedback);
            return ResponseEntity.status(201).body(savedFeedback);
        }catch(EntityNotFoundException e){
            return ResponseEntity.status(403).body(e.getMessage());
        }catch (Exception e){
            return ResponseEntity.status(409).body(e.getMessage());
        }
    }

    @GetMapping("/api/feedback")
    public ResponseEntity<?> getAllFeedback(){
        try{
            List<Feedback> feedbackList=feedbackService.getAllFeedback();
            return ResponseEntity.status(200).body(feedbackList);
        }catch(EntityNotFoundException e){
            return ResponseEntity.status(403).body(e.getMessage());
        }catch(Exception e){
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @GetMapping("api/feedback/user/{userId}")
    public ResponseEntity<?> getFeedbackByUserId(@PathVariable int userId){
        try{
            List<Feedback> feedbackList=feedbackService.getFeedbackByUserId(userId);
            return ResponseEntity.status(200).body(feedbackList);
        }catch(EntityNotFoundException e){
            return ResponseEntity.status(403).body(e.getMessage());
        }catch(Exception e){
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @DeleteMapping("/api/feedback/{id}")
    public ResponseEntity<?> deleteFeedback(@PathVariable Long id){
        try{
            feedbackService.deleteFeedback(id);
            return ResponseEntity.status(204).body("Feedback deleted successfully");
        }catch(EntityNotFoundException e){
            return ResponseEntity.status(403).body(e.getMessage());
        }catch(Exception e){
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @GetMapping("/api/feedback/{feedbackId}")
    public ResponseEntity<?> getFeedbackById(@PathVariable Long feedbackId){
        try{
            Feedback feedback=feedbackService.getFeedbackById(feedbackId);
            return ResponseEntity.status(200).body(feedback);
        }catch(EntityNotFoundException e){
            return ResponseEntity.status(403).body(e.getMessage());
        }catch(Exception e){
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

}
