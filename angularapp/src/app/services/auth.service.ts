import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Login } from '../models/login.model';
import { User } from '../models/user.model';
import { AuthUser } from '../models/auth-user.model';
import { Global } from '../models/global';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Base URL for your backend proxy (adjust if needed)
  private baseUrl =Global.baseUrl;

   // Default HTTP options with JSON header
   private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private httpClient: HttpClient, private router: Router) {}

  // Standard Registration (if you need it outside OTP flow)
  // register(user: User): Observable<any> {
  //   return this.httpClient.post(this.baseUrl + "/api/register", user);
  // }

  // Login function.
  // On success, it stores user details and token in localStorage and navigates to home.
  public login(loginData: Login): void {
    this.httpClient.post<AuthUser>(this.baseUrl + "/api/login", loginData)
      .subscribe(response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userRole', response.userRole);
          localStorage.setItem('username', response.username);
          localStorage.setItem('userId', response.userId);
          console.log('Local storage after login:', localStorage);
          // this.router.navigate(["/home"]);
      }, error => {
        console.error('Login failed:', error);
      });
  }

  public getUsername(): string | null {
    return localStorage.getItem('username');
  }


  // Check if the username already exists (for real-time validation)
  public checkUsername(username: string): Observable<boolean> {
    return this.httpClient.get<boolean>(this.baseUrl + "/api/check-username?username=" + username);
  }

  // Check if the email already exists (for real-time validation)
  public checkEmail(email: string): Observable<boolean> {
    return this.httpClient.get<boolean>(this.baseUrl + "/api/check-email?email=" + email);
  }

  // Check if the mobile number already exists (for real-time validation)
  public checkMobile(mobileNumber: string): Observable<boolean> {
    return this.httpClient.get<boolean>(this.baseUrl + "/api/check-mobile?mobileNumber=" + mobileNumber);
  }

  // Retrieve stored token
  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Retrieve stored user ID
  public getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  // Indicates whether the user is authenticated based on token
  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  public isAdmin(): boolean {
    return localStorage.getItem('userRole') === 'Admin';
  }

  public isUser(): boolean {
    return localStorage.getItem('userRole') === 'User';
  }

  public isGuest(): boolean {
    return localStorage.getItem('userRole') === null;
  }

  // Logout function: Clears localStorage and navigates to login view.
  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
  
   // ------------------ OTP-based Registration Methods ------------------

  /**
   * Sends an OTP to the provided email.
   * The backend generates an OTP and emails it to the user.
   */
  public sendOtp(email: string): Observable<any> {
    return this.httpClient.post(this.baseUrl + "/api/send-otp", email);
  }

  /**
   * Verifies the OTP and registers the user.
   * This method sends the email, OTP, and registration details to the backend.
   * The backend checks if the OTP is correct and still valid.
   */
  public verifyOtpAndRegister(user: User, otp: string): Observable<any> {
    let payload = {
      email: user.email,
      otp: otp,
      user: user
    };
    return this.httpClient.post(this.baseUrl + "/api/verify-otp", payload);
  }
}
