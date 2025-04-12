import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "https://ide-aeccfaadacfebcebdffabdaaaacfffbcfdda.premiumproject.examly.io/proxy/8080"; // Base API URL

  constructor(private http: HttpClient) {}

  // Retrieve all users
  getAllUsers(): Observable<any> {
    return this.http.get(this.baseUrl + '/user');
  }

  // Update user details
  updateUserProfile(userData: any): Observable<any> {
    return this.http.put(this.baseUrl + '/user/view/profile', userData);
  }

  // Retrieve a user by ID
  getUserById(userId: string): Observable<any> {
    return this.http.get(this.baseUrl + '/user/' + userId);
  }

  // Delete a user by ID
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(this.baseUrl + '/' + userId);
  }

  // Retrieve a user by name
  getUserByName(name: string): Observable<any> {
    return this.http.get(this.baseUrl + '/name/' + name);
  }
}
