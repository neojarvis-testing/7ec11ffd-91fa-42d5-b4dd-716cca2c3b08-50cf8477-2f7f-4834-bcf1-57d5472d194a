import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '../helpers/user-store.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';
import { AuthUser } from '../models/auth-user.model';
import { User } from '../models/user.model';
 
@Component({
  selector: 'app-adminnavbar',
  templateUrl: './adminnavbar.component.html',
  styleUrls: ['./adminnavbar.component.css']
})
export class AdminnavbarComponent implements OnInit {
  userName: any;
  userRole: any;
  notificationCount: number = 0; // Track unread notifications
  showProfilePopup: boolean = false; // Control visibility of the profile popup
  user: User = { email: "", password: "", username: "", mobileNumber: "", userRole: "" }; // Store user details
 
  constructor(
    private userStore: UserStoreService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private appointmentService: AppointmentService
  ) {}
 
  ngOnInit(): void {
    this.loadUserFromLocalStorage();
    this.userStore.user$.subscribe((user: AuthUser | null) => {
      if (user) {
        this.userName = user.username;
        this.userRole = user.userRole;
      }
    });
 
    // Fetch notification count
    this.fetchNotificationCount();
    setInterval(() => this.fetchNotificationCount(), 5000); // Poll every 5 seconds
  }
 
  loadUserFromLocalStorage(): void {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      const user: AuthUser = JSON.parse(storedUser);
      this.userStore.setUser(user);
    }
  }
 
  fetchNotificationCount(): void {
    this.appointmentService.getUnreadAppointmentsCount().subscribe(data => {
      this.notificationCount = data.unreadCount; // Assume the backend returns an object with 'unreadCount'
    });
  }
 
  fetchUserDetails(): void {
    const userId = this.authService.getUserId(); // Get logged-in user's ID from AuthService
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (response: User) => {
          this.user = response; // Populate user details
          this.showProfilePopup = true; // Show the profile popup
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    }
  }
 
  closeProfilePopup(): void {
    this.showProfilePopup = false;
  }
 
  viewNotifications(): void {
    this.appointmentService.markAllAsRead().subscribe(() => {
      this.notificationCount = 0; // Reset count locally
      this.router.navigate(['/adminnotification']);
    });
  }
 
  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}