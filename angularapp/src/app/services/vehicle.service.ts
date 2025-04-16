import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleMaintenance } from '../models/vehicle-maintenance.model';
import { Global } from '../models/global';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  public apiUrl: string = Global.baseUrl;
  
  constructor(private httpClient: HttpClient) { }

  public getAllServices(): Observable<any> {
    return this.httpClient.get(this.apiUrl + "/api/services");
  }

  public addService(service: VehicleMaintenance): Observable<any> {
    return this.httpClient.post(this.apiUrl + "/api/services", service);
  }

  public updateService(serviceId: number, updatedService: VehicleMaintenance): Observable<any> {
    return this.httpClient.put(this.apiUrl + "/api/services/" + serviceId, updatedService);
  }

  public deleteService(serviceId: number): Observable<any> {
    return this.httpClient.delete(this.apiUrl + "/api/services/" + serviceId);
  }

  public getServiceByName(serviceName: string): Observable<any> {
    return this.httpClient.get(this.apiUrl + "/api/services/name?name=" + serviceName);
  }

  public getServiceById(serviceId: number): Observable<any> {
    return this.httpClient.get(this.apiUrl + "/api/services/" + serviceId);
  }
  
}
