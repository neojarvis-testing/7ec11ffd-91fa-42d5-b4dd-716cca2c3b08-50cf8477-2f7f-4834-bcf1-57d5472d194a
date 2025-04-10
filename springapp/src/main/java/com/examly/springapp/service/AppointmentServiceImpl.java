package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Appointment;
import com.examly.springapp.model.Feedback;
import com.examly.springapp.model.VehicleMaintenance;
import com.examly.springapp.repository.AppointmentRepo;

import jakarta.persistence.EntityNotFoundException;

@Service
public class AppointmentServiceImpl implements AppointmentService{
    @Autowired
    private AppointmentRepo appoinmentRepo;
    @Override
    public Appointment addAppointment(Appointment appointment) {
        return appoinmentRepo.save(appointment);
    }

    @Override
    public void deleteAppointment(Long appointmentId) {
        Optional<Appointment> opt = appoinmentRepo.findById(appointmentId);
        if(opt.isEmpty()){
            throw new EntityNotFoundException("Not Found");
        }
        appoinmentRepo.deleteById(appointmentId);
    }

    @Override
    public Optional<Appointment> getAppointmentById(Long appointmentId) {
        Optional<Appointment> opt = appoinmentRepo.findById(appointmentId);
        if(opt.isEmpty()){
            throw new EntityNotFoundException("Not Found");
        }
        return appoinmentRepo.findById(appointmentId);
    }

    @Override
    public List<Appointment> getAllAppointments() {
        List<Appointment> appointmentList = appoinmentRepo.findAll();
        return appointmentList;
    }

    @Override
    public List<Appointment> getAppointmentByUserId(int userId) {
        List<Appointment> appointmentList = appoinmentRepo.findByUserId(userId);
        return appointmentList;
    }

    @Override
    public Appointment updateAppointment(Long appointmentId, Appointment appointment) {
        Optional<Appointment> opt = appoinmentRepo.findById(appointmentId);
        if(opt.isEmpty())
        {
            throw new EntityNotFoundException("Not Found");
        }
        
        appointment.setAppointmentId(appointmentId);
        return appoinmentRepo.save(appointment);
    }
    
    
}
