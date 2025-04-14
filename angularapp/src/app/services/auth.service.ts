import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Login } from '../models/login.model';
import { User } from '../models/user.model';
import { AuthUser } from '../models/auth-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Base URL for your backend proxy (adjust if needed)
  private baseUrl = "https://ide-aaecabeadbafefcebdffabdaaaacfffbcfdda.premiumproject.examly.io/proxy/8080";  

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
  login(loginData: Login): void {
    this.httpClient.post<AuthUser>(this.baseUrl + "/api/login", loginData)
      .subscribe(response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userRole', response.userRole);
          localStorage.setItem('username', response.username);
          localStorage.setItem('userId', response.userId);
          console.log('Local storage after login:', localStorage);
          this.router.navigate(["/home"]);
      }, error => {
        console.error('Login failed:', error);
      });
  }

  // Check if the username already exists (for real-time validation)
  checkUsername(username: string): Observable<boolean> {
    return this.httpClient.get<boolean>(this.baseUrl + "/api/check-username?username=" + username);
  }

  // Check if the email already exists (for real-time validation)
  checkEmail(email: string): Observable<boolean> {
    return this.httpClient.get<boolean>(this.baseUrl + "/api/check-email?email=" + email);
  }

  // Check if the mobile number already exists (for real-time validation)
  checkMobile(mobileNumber: string): Observable<boolean> {
    return this.httpClient.get<boolean>(this.baseUrl + "/api/check-mobile?mobileNumber=" + mobileNumber);
  }

  // Retrieve stored token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Retrieve stored user ID
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  // Indicates whether the user is authenticated based on token
  isAuthenticated(): boolean {
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
  logout(): void {
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
  sendOtp(email: string): Observable<any> {
    return this.httpClient.post(this.baseUrl + "/api/send-otp", email);
  }

  /**
   * Verifies the OTP and registers the user.
   * This method sends the email, OTP, and registration details to the backend.
   * The backend checks if the OTP is correct and still valid.
   */
  verifyOtpAndRegister(user: User, otp: string): Observable<any> {
    let payload = {
      email: user.email,
      otp: otp,
      user: user
    };
    return this.httpClient.post(this.baseUrl + "/api/verify-otp", payload);
  }
}
