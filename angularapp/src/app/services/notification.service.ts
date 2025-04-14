import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'https://ide-aaecabeadbafefcebdffabdaaaacfffbcfdda.premiumproject.examly.io/proxy/8080';
 
  constructor(private httpClient: HttpClient) {}
 
  getUserNotifications(userId: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/api/notifications/${userId}`);
  }
 
  deleteNotification(notificationId: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/api/notifications/${notificationId}`);
  }
}
 