import { Component, OnInit } from '@angular/core';
import { VehicleMaintenance } from '../models/vehicle-maintenance.model';
import { VehicleService } from '../services/vehicle.service';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../models/appointment.model';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-useraddappointment',
  templateUrl: './useraddappointment.component.html',
  styleUrls: ['./useraddappointment.component.css']
})
export class UseraddappointmentComponent implements OnInit {
  services: VehicleMaintenance[] = [];
  appointmentDates: string[] = [];
  locations: string[] = [];
  showPopup: boolean = false;
  searchData:string="";
 
  constructor(private vehicleService: VehicleService, private appointmentService: AppointmentService,private authService : AuthService,private router: Router) { }
  userId : number;
  ngOnInit(): void {
    this.userId = parseInt(this.authService.getUserId());
    console.log(this.userId);
    this.getAllServices();
  }
 
  public getAllServices() {
    this.vehicleService.getAllServices().subscribe(data => {
      this.services = data;
    });
  }
  public validateDate(selectedDate: string, index: number): void {
    const today = new Date();
    const selected = new Date(selectedDate);
 
    if (selected < today) {
      this.appointmentDates[index] = ''; // Reset the value if invalid
      alert('Please select a date in the future.');
    }
  }
  public addAppointment(id:number,index: number) {
    const newAppointment: Appointment = {
        service: { serviceId: id } as VehicleMaintenance,
        appointmentDate: this.appointmentDates[index],
        location: this.locations[index],
        status: 'Pending',
        user: { userId: this.userId } as User
    };
    console.log(newAppointment);
    this.appointmentService.addAppointment(newAppointment).subscribe(response => {
        console.log('Appointment added successfully', response);
        this.showPopup = true;
    }, error => {
        console.error('Error adding appointment', error);
    });
}
 
public closePopup() {
  this.showPopup = false;
  this.router.navigate(['/useraddappointment']);
}
  // Add the onInputChange method
  public onInputChange(index: number): void {
    console.log(`Input changed at index: ${index}`);
  }
 
  public searchByService()
  {
    this.vehicleService.getAllServices().subscribe(data => {
      this.services = data;
      this.services = this.services.filter(service =>
        service.serviceName.toLowerCase().includes(this.searchData.toLowerCase())
      );
    });
  }
 
}
 
 
 
 