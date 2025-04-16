import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../models/global';
 
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl =Global.baseUrl;
 
  constructor(private httpClient: HttpClient) {}
 
  public getUserNotifications(userId: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/api/notifications/${userId}`);
  }
 
  public deleteNotification(notificationId: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/api/notifications/${notificationId}`);
  }
}
 