package com.examly.springapp.model;
 
import java.io.Serializable;
import java.time.LocalDateTime;
 
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class Notification implements Serializable{
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;
 
    private String message;
    private boolean isRead; // To track if the notification has been read
    private LocalDateTime timestamp; // Timestamp of when the notification was created
 
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user; // The user to whom this notification belongs
 
    @ManyToOne
    @JoinColumn(name = "appointmentId")
    private Appointment appointment; // Optional: Link to the related appointment
}
 