package com.examly.springapp.controller;
 
import java.util.List;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
 
import com.examly.springapp.model.Notification;
import com.examly.springapp.service.NotificationService;
 
@RestController
public class NotificationController {
 
    @Autowired
    private NotificationService notificationService;
 
@PostMapping("/api/notifications")
public ResponseEntity<?> createNotification(@RequestBody Notification notification) {
    notificationService.saveNotification(notification);
    return ResponseEntity.ok("Notification created successfully.");
}
 
@GetMapping("/api/notifications/{userId}")
public ResponseEntity<List<Notification>> getUserNotifications(@PathVariable int userId) {
    List<Notification> notifications = notificationService.getNotificationsForUser(userId);
    return ResponseEntity.ok(notifications);
}
 
@DeleteMapping("/{notificationId}")
public ResponseEntity<?> deleteNotification(@PathVariable Long notificationId) {
    try {
        notificationService.deleteNotification(notificationId);
        return ResponseEntity.ok("Notification deleted successfully.");
    } catch (Exception e) {
        return ResponseEntity.status(500).body("Error deleting notification: " + e.getMessage());
    }
}
 
}