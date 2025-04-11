package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.FeedbackRepo;
import com.examly.springapp.repository.UserRepo;

import jakarta.persistence.EntityNotFoundException;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    @Autowired FeedbackRepo feedbackRepo;
    @Autowired UserRepo userRepo;

    @Override
    public Feedback createFeedback(Feedback feedback) {
        User user = userRepo.findById(feedback.getUser().getUserId()).get();
        feedback.setUser(user);
        Feedback savedFeedback=feedbackRepo.save(feedback);
        return savedFeedback;
    }

    @Override
    public Feedback getFeedbackById(Long feedbackId) {
        Optional<Feedback> optional=feedbackRepo.findById(feedbackId);
        if(optional.isEmpty()){
            throw new EntityNotFoundException();
        }
        return optional.get();
    }

    @Override
    public List<Feedback> getAllFeedback() {
        List<Feedback> feedbackList=feedbackRepo.findAll();
        return feedbackList;
    }


    @Override
    public Feedback deleteFeedback(Long feedbackId) {
        if (feedbackRepo.existsById(feedbackId)) {
            Feedback feedback = feedbackRepo.findById(feedbackId).orElse(null);
            if (feedback != null) {
                feedbackRepo.deleteById(feedbackId);
                return feedback;
            }
        }
        return null;
    }
    

    @Override
    public List<Feedback> getFeedbackByUserId(int userId) {
        List<Feedback> feedbackList=feedbackRepo.findByUserUserId(userId);
        return feedbackList;
    }
    
}
