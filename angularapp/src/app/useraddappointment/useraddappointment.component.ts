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
  userId : number | null = null;
  ngOnInit(): void {
    this.userId = parseInt(this.authService.getUserId());
    this.getAllServices();
  }
 
  getAllServices() {
    this.vehicleService.getAllServices().subscribe(data => {
      this.services = data;
    });
  }
 
  addAppointment(id:number,index: number) {
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
 
closePopup() {
  this.showPopup = false;
  this.router.navigate(['/useraddappointment']);
}
  // Add the onInputChange method
  onInputChange(index: number): void {
    console.log(`Input changed at index: ${index}`);
  }

  searchByService()
  {
    this.vehicleService.getAllServices().subscribe(data => {
      this.services = data;
      this.services = this.services.filter(service => 
        service.serviceName.toLowerCase().includes(this.searchData.toLowerCase())
      );
    });
  }
  
}