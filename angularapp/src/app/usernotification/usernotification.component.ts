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
    this.username = this.authService.getUsername() || 'Guest'; // Fetch the username and use 'Guest' as fallback
    this.fetchNotifications();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all active subscriptions to prevent memory leaks
    this.subscriptions.unsubscribe();
  }

  public fetchUsername(): void {
    this.username = this.authService.getUsername(); // Replace with actual method to retrieve username
  }

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

  public handlePayment(notification: any): void {
    console.log(`Processing payment for notification: ${notification.message}`);
    alert('Redirecting to payment page...');
    this.router.navigate(['/userviewappointment']);
  }

  public removeNotification(index: number): void {
    this.notifications.splice(index, 1); // Simply remove the notification from the array
  }
}
