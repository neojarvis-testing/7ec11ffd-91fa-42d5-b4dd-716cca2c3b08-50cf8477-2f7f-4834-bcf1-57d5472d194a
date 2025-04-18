import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment.model';
import { Global } from '../models/global';
 
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
 
  public apiUrl=Global.baseUrl;
 
  constructor(private httpClient:HttpClient) { }
 
  // Fetch all appointments
  public getAppointments(): Observable<any> {
    return this.httpClient.get(this.apiUrl + "/api/appointment");
  }
 
  // Fetch a single appointment by ID
  public getAppointment(appointmentId: number): Observable<any> {
    return this.httpClient.get(this.apiUrl + "/api/appointment/" + appointmentId);
  }
 
  // Fetch appointments by user ID
  public getAppointmentsByUser(userId: number): Observable<any> {
    return this.httpClient.get(this.apiUrl + "/api/appointment/user/" + userId);
  }
 
  // Add a new appointment
  public addAppointment(appointment: Appointment): Observable<any> {
    console.log("service:", JSON.stringify(appointment));
    return this.httpClient.post(this.apiUrl + "/api/appointment", appointment);
  }
 
  // Update an existing appointment
  public updateAppointment(appointmentId: number, appointment: Appointment): Observable<any> {
    return this.httpClient.put(this.apiUrl + "/api/appointment/" + appointmentId, appointment);
  }
 
  // Delete an appointment
  public deleteAppointment(appointmentId: number): Observable<any> {
    return this.httpClient.delete(this.apiUrl + "/api/appointment/" + appointmentId);
  }
 
  // New method: Request payment for an appointment
  public requestPayment(appointmentId: number, options: any = {}): Observable<any> {
    return this.httpClient.put(this.apiUrl + `/api/appointment/${appointmentId}/request-payment`, {}, options);
  }

  public addPayment(paymentDetails: any): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl+"/api/payments", paymentDetails);
  }
  public getUnreadAppointmentsCount(): Observable<{ unreadCount: number }> {
    return this.httpClient.get<{ unreadCount: number }>(this.apiUrl+"/unread-count");
  }
 
  public markAllAsRead(): Observable<void> {
    return this.httpClient.post<void>(this.apiUrl + "/mark-read", null); // Pass null as the body
  }
 
  // Fetch user details by user ID
  public getUserDetails(userId: number): Observable<any> {
    return this.httpClient.get(this.apiUrl+"/api/users/"+userId);
  }

}