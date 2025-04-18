import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserStoreService } from '../helpers/user-store.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';
import { AuthUser } from '../models/auth-user.model';
import { User } from '../models/user.model';
import { Subscription} from 'rxjs';

@Component({
  selector: 'app-adminnavbar',
  templateUrl: './adminnavbar.component.html',
  styleUrls: ['./adminnavbar.component.css']
})
export class AdminnavbarComponent implements OnInit, OnDestroy {
  userName: any;
  userRole: any;
  notificationCount: number = 0; // Track unread notifications
  showProfilePopup: boolean = false; // Control visibility of the profile popup
  showLogoutPopup: boolean = false; // Control visibility of the logout popup
  user: User = { email: "", password: "", username: "", mobileNumber: "", userRole: "" }; // Store user details

  private subscriptions: Subscription = new Subscription(); // Manage multiple subscriptions
  private notificationInterval: any; // For setInterval

  constructor(
    private userStore: UserStoreService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.loadUserFromLocalStorage();
    const userSubscription = this.userStore.user$.subscribe((user: AuthUser | null) => {
      if (user) {
        this.userName = user.username;
        this.userRole = user.userRole;
      }
    });
    this.subscriptions.add(userSubscription);

    // Fetch notification count
    this.fetchNotificationCount();

    // Set up polling with setInterval
    this.notificationInterval = setInterval(() => this.fetchNotificationCount(), 5000);
  }

  public loadUserFromLocalStorage(): void {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      const user: AuthUser = JSON.parse(storedUser);
      this.userStore.setUser(user);
    }
  }

  public fetchNotificationCount(): void {
    const notificationSubscription = this.appointmentService.getUnreadAppointmentsCount().subscribe(data => {
      this.notificationCount = data.unreadCount; // Assume the backend returns an object with 'unreadCount'
    });
    this.subscriptions.add(notificationSubscription);
  }

  public fetchUserDetails(): void {
    const userId = this.authService.getUserId(); // Get logged-in user's ID from AuthService
    if (userId) {
      const userDetailsSubscription = this.userService.getUserById(userId).subscribe(
        (response: User) => {
          this.user = response; // Populate user details
          this.showProfilePopup = true; // Show the profile popup
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
      this.subscriptions.add(userDetailsSubscription);
    }
  }

  public closeProfilePopup(): void {
    this.showProfilePopup = false;
  }

  public viewNotifications(): void {
    const notificationsSubscription = this.appointmentService.markAllAsRead().subscribe(() => {
      this.notificationCount = 0; // Reset count locally
      this.router.navigate(['/adminnotification']);
    });
    this.subscriptions.add(notificationsSubscription);
  }

  public logout(): void {
    this.showLogoutPopup = true; // Trigger the logout confirmation modal
  }

  public confirmLogout(): void {
    this.authService.logout(); // Call logout logic
    this.router.navigate(['/home']); // Redirect to login page
    this.showLogoutPopup = false; // Close modal
  }

  public closeLogoutPopup(): void {
    this.showLogoutPopup = false; // Close modal
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.subscriptions.unsubscribe();

    // Clear the polling interval
    if (this.notificationInterval) {
      clearInterval(this.notificationInterval);
    }
  }
}
