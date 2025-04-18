import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Global } from '../models/global';
 
@Injectable({
  providedIn: 'root'
})
export class UserdetailsService {
 
  public apiUrl:string=Global.baseUrl;
 
  constructor(private httpClient:HttpClient) { }
 
  // Fetch all users
  public getAllUsers(): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/api/user');
  }
 
  // Delete user by ID
  public deleteUser(userId: number): Observable<any> {
    return this.httpClient.delete(this.apiUrl + '/api' + userId);
  }
 
  // Get user by name
  public getUserByName(name: string): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/api/name/' + name);
  }
 
  // Update user details
  public updateUser(userId: number, userData: User): Observable<any> {
    return this.httpClient.put(this.apiUrl + '/api/user/view/' + userId, userData);
  }
 
  // Register a new user
  public createUser(userData: User): Observable<any> {
    return this.httpClient.post(this.apiUrl + '/api/register', userData);
  }
 
  // Get user by ID
  public getUserById(userId: number): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/api/user/' + userId);
  }
 
}
 
 