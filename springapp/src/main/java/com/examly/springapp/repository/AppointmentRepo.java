package com.examly.springapp.repository;

import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Appointment;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface AppointmentRepo extends JpaRepository<Appointment,Long>{
    @Query("SELECT a FROM Appointment a WHERE a.user.id = :userId")
    public List<Appointment> findByUserId(int userId);
    
}
