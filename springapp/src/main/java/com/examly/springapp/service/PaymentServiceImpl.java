package com.examly.springapp.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Payment;
import com.examly.springapp.repository.PaymentRepo;

@Service
public class PaymentServiceImpl {
    @Autowired
    private PaymentRepo paymentRepository;

    public List<Payment> getPaymentsByUsername(String username) {
        return paymentRepository.findByUsername(username);
    }

    public BigDecimal getTotalPayments() {
        return paymentRepository.getTotalPayments();
    }

    public Payment savePayment(Payment payment) {
        return paymentRepository.save(payment); // Persist payment
    }
}
