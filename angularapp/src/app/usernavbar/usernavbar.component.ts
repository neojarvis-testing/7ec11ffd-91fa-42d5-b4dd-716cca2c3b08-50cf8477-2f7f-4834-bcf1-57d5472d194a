import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '../helpers/user-store.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-usernavbar',
  templateUrl: './usernavbar.component.html',
  styleUrls: ['./usernavbar.component.css']
})
export class UsernavbarComponent implements OnInit {
  userName: any;
  userRole: any;
  showProfilePopup: boolean = false; // Control the visibility of the profile popup
  user: User = { email: "", password: "", username: "", mobileNumber: "", userRole: "" }; // Store user details

  constructor(
    private userStore: UserStoreService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserFromLocalStorage();
    this.userStore.user$.subscribe((user) => {
      if (user) {
        this.userName = user.username;
        this.userRole = user.userRole;
      }
    });
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

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  navigateToNotifications(): void {
    this.router.navigate(['/usernotification']);
  }
}