import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/login.model';
import { UserStoreService } from '../helpers/user-store.service';
import { User } from '../models/user.model';
import {tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public apiUrl = 'https://ide-ffeffbaeceacebdffabdaaaacfffbcfdda.premiumproject.examly.io/proxy/8080/'
  constructor(private httpClient: HttpClient, private userStore: UserStoreService) {
  }
 
  register(user: User): Observable<any> {
    return this.httpClient.post(this.apiUrl + "/register", user).pipe(
      tap(registeredUser => {
        console.log("User registered successfully", registeredUser);
      })
    );
  }
  login(credentials: Login): Observable<any> {
    return this.httpClient.post(this.apiUrl + "/login", credentials);
  }
  logout(): void {
    this.userStore.setUser(null);
  }
 
  isAuthenticated(): boolean {
    return this.userStore.isLoggedIn();
  }
  isAdmin(): boolean {
    const authUser = this.userStore.authUser;
    return authUser?.role === 'ADMIN';
  }
  getCurrentUserId(): number | null {
    const authUser = this.userStore.authUser;
    return authUser ? authUser.userId : null;
 
  }
 
}
