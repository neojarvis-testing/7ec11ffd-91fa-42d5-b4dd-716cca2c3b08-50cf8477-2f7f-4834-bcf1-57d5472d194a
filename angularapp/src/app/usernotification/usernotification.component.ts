import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
 
@Component({
  selector: 'app-usernotification',
  templateUrl: './usernotification.component.html',
  styleUrls: ['./usernotification.component.css']
})
export class UserNotificationComponent implements OnInit, OnDestroy {
  notifications: any[] = [];
  username: string = ''; // Store the username here
 
  private subscriptions: Subscription = new Subscription(); // Manage multiple subscriptions
 
  constructor(
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router
  ) {}
 
  ngOnInit(): void {
    // Fetch the username and use 'Guest' as fallback
    this.username = this.authService.getUsername() || 'Guest';
    this.fetchNotifications();
  }
 
  ngOnDestroy(): void {
    // Unsubscribe from all active subscriptions to prevent memory leaks
    this.subscriptions.unsubscribe();
  }
 
  // Fetch the notifications for the logged-in user
  public fetchNotifications(): void {
    const userId = Number(this.authService.getUserId());
    if (userId) {
      const notificationSubscription = this.notificationService.getUserNotifications(userId).subscribe(
        (data: any) => {
          this.notifications = data;
        },
        (error: any) => {
          console.error('Error fetching notifications:', error);
        }
      );
      this.subscriptions.add(notificationSubscription); // Add the subscription to the tracker
    } else {
      console.error('User ID not found. Unable to fetch notifications.');
    }
  }
 
  // Handle payment button click
  public handlePayment(notification: any): void {
    console.log(`Processing payment for notification: ${notification.message}`);
    alert('Redirecting to payment page...');
    this.router.navigate(['/userviewappointment']);
  }
 
  // Remove a notification by its index and delete it from the backend
  public removeNotification(index: number): void {
    const notification = this.notifications[index]; // Get the notification to be removed
    if (!notification || !notification.notificationId) {
      console.error('Notification ID not found. Unable to delete notification.');
      return;
    }
 
    const deleteSubscription = this.notificationService.deleteNotification(notification.notificationId).subscribe(
      () => {
        console.log(`Notification with ID ${notification.notificationId} deleted successfully.`);
        this.notifications.splice(index, 1); // Remove the notification from the UI
      },
      (error: any) => {
        console.error('Error deleting notification:', error);
      }
    );
    this.subscriptions.add(deleteSubscription); // Add the subscription to the tracker
  }
}