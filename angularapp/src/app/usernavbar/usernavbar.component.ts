import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserStoreService } from '../helpers/user-store.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';
 
@Component({
  selector: 'app-usernavbar',
  templateUrl: './usernavbar.component.html',
  styleUrls: ['./usernavbar.component.css']
})
export class UsernavbarComponent implements OnInit, OnDestroy {
  userName: any;
  userRole: any;
  showProfilePopup: boolean = false; // Control the visibility of the profile popup
  showLogoutPopup: boolean = false; // Control the visibility of the logout confirmation popup
  user: User = { email: "", password: "", username: "", mobileNumber: "", userRole: "" }; // Store user details
 
  private subscriptions: Subscription = new Subscription(); // Manage multiple subscriptions
 
  constructor(
    private userStore: UserStoreService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}
 
  ngOnInit(): void {
    this.loadUserFromLocalStorage();
   
    const userStoreSubscription = this.userStore.user$.subscribe((user) => {
      if (user) {
        this.userName = user.username;
        this.userRole = user.userRole;
      }
    });
    this.subscriptions.add(userStoreSubscription);
  }
 
  ngOnDestroy(): void {
    // Unsubscribe from all active subscriptions to prevent memory leaks
    this.subscriptions.unsubscribe();
  }
 
  loadUserFromLocalStorage(): void {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.userStore.setUser(user);
    }
  }
 
  fetchUserDetails(): void {
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
 
  closeProfilePopup(): void {
    this.showProfilePopup = false;
  }
 
  showLogoutConfirmation(): void {
    this.showLogoutPopup = true; // Show the logout confirmation popup
  }
 
  closeLogoutPopup(): void {
    this.showLogoutPopup = false; // Hide the logout confirmation popup
  }
 
  confirmLogout(): void {
    this.authService.logout(); // Perform the logout action
    this.router.navigate(['/home']); // Redirect to the login page
    this.showLogoutPopup = false; // Hide the logout confirmation popup
  }
 
  navigateToNotifications(): void {
    this.router.navigate(['/usernotification']);
  }
}
 