import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-usernotification',
  templateUrl: './usernotification.component.html',
  styleUrls: ['./usernotification.component.css']
})
export class UserNotificationComponent implements OnInit {
  notifications: any[] = [];

  username: string = ''; // Store the username here

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername() || 'Guest'; // Fetch the username and use 'Guest' as fallback
    this.fetchNotifications();
  }

  fetchUsername(): void {
    this.username = this.authService.getUsername(); // Replace with actual method to retrieve username
  }

  fetchNotifications(): void {
    const userId = Number(this.authService.getUserId());
    if (userId) {
      this.notificationService.getUserNotifications(userId).subscribe(
        (data: any) => {
          this.notifications = data;
        },
        (error: any) => {
          console.error('Error fetching notifications:', error);
        }
      );
    } else {
      console.error('User ID not found. Unable to fetch notifications.');
    }
  }

  handlePayment(notification: any): void {
    console.log(`Processing payment for notification: ${notification.message}`);
    alert('Redirecting to payment page...');
  }

  removeNotification(index: number): void {
    this.notifications.splice(index, 1); // Simply remove the notification from the array
  }
}