import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Authresponse } from '../models/authresponse.model';
import { Login } from '../models/login.model';
import { UserStoreService } from '../helpers/user-store.service';
import { User } from '../models/user.model';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = "https://ide-aaecabeadbafefcebdffabdaaaacfffbcfdda.premiumproject.examly.io/proxy/8080";  
  
  constructor(private httpClient: HttpClient) {}


  // Register a new user
  register(user: User): Observable<any> {
    return this.httpClient.post(this.baseUrl+"/api/register", user);
  }

  // Login function with token storage
  login(loginData: Login): void {
    this.httpClient.post<Authresponse>(this.baseUrl+"/api/login", loginData)
      .subscribe(response => {
        localStorage.setItem('token', response.jwtToken);
        localStorage.setItem('userRole', response.userRole);
        localStorage.setItem('username', response.username);
        localStorage.setItem('userId', response.userId);
        
        // if (response.userRole === 'Admin') {

        //   this.router.navigate(['/home']);

        // } else if (response.userRole === 'User') {

        //   this.router.navigate(['/usernavbar']);

        // }
      }, error => {
        console.error('Login failed:', error);
      });
  }

  // Get the stored authentication token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Get stored user ID
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  // Logout function
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    
    // Navigate to login page after logout
    // this.router.navigate(['/login']);
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();  // Returns true if token exists
  }

}


