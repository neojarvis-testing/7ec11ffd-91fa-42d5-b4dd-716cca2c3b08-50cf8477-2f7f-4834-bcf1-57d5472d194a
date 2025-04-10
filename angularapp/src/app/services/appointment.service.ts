import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment.model';
 
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
 
  public apiUrl="https://ide-ffeffbaeceacebdffabdaaaacfffbcfdda.premiumproject.examly.io/proxy/8080/";
 
  constructor(private httpClient:HttpClient) { }
 
  getAppointments():Observable<any>{
    return this.httpClient.get(this.apiUrl+"/appointment");
  }
 
  getAppointmentsByUser(userId: number):Observable<any>{
    return this.httpClient.get(this.apiUrl+"/appointment/user/"+userId);
  }
 
  addAppointment(appointment: Appointment):Observable<any>{
    return this.httpClient.post(this.apiUrl+"/appointment",appointment);
  }
 
  updateAppointment(appointmentId: number, appointment: Appointment):Observable<any>{
    return this.httpClient.put(this.apiUrl+"/appointment/"+appointmentId,appointment);
  }
 
  deleteAppointment(appointmentId: number): Observable<any>{
    return this.httpClient.delete(this.apiUrl+"/appointment/"+appointmentId);
  }
}