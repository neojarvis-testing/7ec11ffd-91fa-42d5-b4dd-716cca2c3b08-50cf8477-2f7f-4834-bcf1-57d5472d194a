import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AuthUser } from '../models/auth-user.model';
import { UserStoreService } from '../helpers/user-store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  userName: string = "";
  userRole: string = "";
  isLoggedIn = false;

  private subscriptions: Subscription = new Subscription(); // Manage multiple subscriptions

  constructor(
    private userStore: UserStoreService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.isLoggedIn);

    // Load the user from localStorage
    this.loadUserFromLocalStorage();

    // Subscribe to user state from UserStoreService
    const userSubscription = this.userStore.user$.subscribe((user: AuthUser | null) => {
      if (user) {
        this.isLoggedIn = true;
        this.userName = user.username;
        this.userRole = user.userRole;
      } else {
        this.isLoggedIn = false;
        this.userName = '';
        this.userRole = '';
      }
    });
    this.subscriptions.add(userSubscription);
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subscriptions.unsubscribe();
  }

  public loadUserFromLocalStorage(): void {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      const user: AuthUser = JSON.parse(storedUser);
      this.userStore.setUser(user);
    }
  }

  public updateUserState(): void {
    this.isLoggedIn = this.userStore.isLoggedIn();
    this.userName = this.userStore.authUser?.username || '';
    this.userRole = this.userStore.authUser?.userRole || '';
  }

  public logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.userName = '';
    this.userRole = '';
    this.router.navigate(['/login']);
  }
}
