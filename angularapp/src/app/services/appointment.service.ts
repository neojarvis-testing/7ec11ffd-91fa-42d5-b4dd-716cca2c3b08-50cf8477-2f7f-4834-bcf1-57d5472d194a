import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {


  public apiUrl="https://ide-aeccfaadacfebcebdffabdaaaacfffbcfdda.premiumproject.examly.io/proxy/8080";
  

  constructor(private httpClient:HttpClient) { }

  // Fetch all appointments
  getAppointments(): Observable<any> {
    return this.httpClient.get(this.apiUrl + "/api/appointment");
  }

  // Fetch a single appointment by ID
  getAppointment(appointmentId: number): Observable<any> {
    return this.httpClient.get(this.apiUrl + "/api/appointment/" + appointmentId);
  }

  // Fetch appointments by user ID
  getAppointmentsByUser(userId: number): Observable<any> {
    return this.httpClient.get(this.apiUrl + "/api/appointment/user/" + userId);
  }

  // Add a new appointment
  addAppointment(appointment: Appointment): Observable<any> {
    return this.httpClient.post(this.apiUrl + "/api/appointment", appointment);
  }

  // Update an existing appointment
  updateAppointment(appointmentId: number, appointment: Appointment): Observable<any> {
    return this.httpClient.put(this.apiUrl + "/api/appointment/" + appointmentId, appointment);
  }

  // Delete an appointment
  deleteAppointment(appointmentId: number): Observable<any> {
    return this.httpClient.delete(this.apiUrl + "/api/appointment/" + appointmentId);
  }


  // New method: Request payment for an appointment
  requestPayment(appointmentId: number, options: any = {}): Observable<any> {
    return this.httpClient.put(this.apiUrl + `/api/appointment/${appointmentId}/request-payment`, {}, options);
  }

  addPayment(paymentDetails: any): Observable<any> {
    return this.httpClient.post<any>("/api/payments", paymentDetails);
  }


}