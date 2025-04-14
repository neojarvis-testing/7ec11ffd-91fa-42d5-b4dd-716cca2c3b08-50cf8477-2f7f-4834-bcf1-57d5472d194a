import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { Login } from '../models/login.model';
import { User } from '../models/user.model';
import { tap } from 'rxjs/operators';
import { AuthUser } from '../models/auth-user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "https://ide-aeccfaadacfebcebdffabdaaaacfffbcfdda.premiumproject.examly.io/proxy/8080";  
 
  constructor(private httpClient: HttpClient, private router: Router) {}

  // Register a new user
  register(user: User): Observable<any> {
    return this.httpClient.post(this.baseUrl + "/api/register", user);
  }

  // Login function with token storage
  login(loginData: Login): void {
    this.httpClient.post<AuthUser>(this.baseUrl + "/api/login", loginData)
      .subscribe(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userRole', response.userRole);
        localStorage.setItem('username', response.username);
        localStorage.setItem('userId', response.userId);

        console.log(localStorage);

        this.router.navigate(["/home"]);
        
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

  // Get stored username
  getUsername(): string | null {
    return localStorage.getItem('username'); // Retrieves the username from localStorage
  }

  // Logout function
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    
    // Navigate to login page after logout
    this.router.navigate(['/login']);
  }

  private apiUrl = 'https://your-api.com/auth';

  constructor(private http: HttpClient) {}


  // login(username: string, password: string): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/login`, { username, password }).subscribe(response => {
  //     localStorage.setItem('token', response.token);
  //   });
  // }


  public isAdmin(): boolean {
    return localStorage.getItem('userRole') === 'Admin';
  }

  public isUser(): boolean {
    return localStorage.getItem('userRole') === 'User';
  }

  public isGuest(): boolean {
    return localStorage.getItem('userRole') === null;
  }
}

  // logout(): void {
  //   localStorage.removeItem('token');
  // }

  // isLoggedIn(): boolean {
  //   const token = localStorage.getItem('token');
  //   return !!token;
  // }

  

}

