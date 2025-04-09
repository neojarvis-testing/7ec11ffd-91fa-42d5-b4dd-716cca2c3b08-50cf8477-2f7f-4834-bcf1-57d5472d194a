package com.examly.springapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class LoginDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId ; 

    private String email ; 
    private String password ;
    private String username;
    private String mobileNumber ; 
    private String userRole ; 
     

}
