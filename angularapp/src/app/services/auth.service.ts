import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://your-api.com/auth';

  constructor(private http: HttpClient) {}

  // login(username: string, password: string): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/login`, { username, password }).subscribe(response => {
  //     localStorage.setItem('token', response.token);
  //   });
  // }

  // logout(): void {
  //   localStorage.removeItem('token');
  // }

  // isLoggedIn(): boolean {
  //   const token = localStorage.getItem('token');
  //   return !!token;
  // }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

}
