import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserdetailsService {

  public apiUrl:string="https://ide-ffeffbaeceacebdffabdaaaacfffbcfdda.premiumproject.examly.io/proxy/8080/api";

  constructor(private httpClient:HttpClient) { }
  
  // Fetch all users
  public getAllUsers(): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/user');
  }

  // Delete user by ID
  public deleteUser(userId: number): Observable<any> {
    return this.httpClient.delete(this.apiUrl + '/' + userId);
  }

  // Get user by name
  public getUserByName(name: string): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/name/' + name);
  }

  // Update user details
  public updateUser(userId: number, userData: User): Observable<any> {
    return this.httpClient.put(this.apiUrl + '/user/view/' + userId, userData);
  }

  // Register a new user
  public createUser(userData: User): Observable<any> {
    return this.httpClient.post(this.apiUrl + '/register', userData);
  }

  // Get user by ID
  public getUserById(userId: number): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/user/' + userId);
  }

}
