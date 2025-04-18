import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Global } from '../models/global';
 
@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  public apiUrl = Global.baseUrl;
 
  constructor(private httpClient: HttpClient) { }
 
  // Retrieve all users
  public getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiUrl + '/api/users');
  }
 
  // Update user details
  public updateUserProfile(userId: number, userData: User): Observable<User> {
    return this.httpClient.put<User>(this.apiUrl + '/api/user/' + userId, userData);
  }
 
  // Retrieve a user by ID
  public getUserById(userId: string): Observable<User> {
    return this.httpClient.get<User>(this.apiUrl + '/api/user/' + userId);
  }
 
  // Delete a user by ID
  public deleteUser(userId: string): Observable<void> {
    return this.httpClient.delete<void>(this.apiUrl + '/api/user/' + userId);
  }
 
  // Retrieve a user by name
  public getUserByName(name: string): Observable<User> {
    return this.httpClient.get<User>(this.apiUrl + '/api/user/name/' + name);
  }

  
}