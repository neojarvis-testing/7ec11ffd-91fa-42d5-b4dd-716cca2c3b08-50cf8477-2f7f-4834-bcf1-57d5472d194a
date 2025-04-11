import { Component, OnInit } from '@angular/core';
import { VehicleMaintenance } from '../models/vehicle-maintenance.model';
import { VehicleService } from '../services/vehicle.service';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../models/appointment.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-useraddappointment',
  templateUrl: './useraddappointment.component.html',
  styleUrls: ['./useraddappointment.component.css']
})
export class UseraddappointmentComponent implements OnInit {
  services: VehicleMaintenance[] = [];
  appointmentDates: string[] = [];
  locations: string[] = [];

  constructor(private vehicleService: VehicleService, private appointmentService: AppointmentService) { }
  userId: number = 2;
  id : number = 1;
  user : User;
  ngOnInit(): void {
    this.getAllServices();
  }

  getAllServices() {
    this.vehicleService.getAllServices().subscribe(data => {
      this.services = data;
    });
  }

  addAppointment(index: number) {
    const newAppointment: Appointment = {
        service: { serviceId: this.id } as VehicleMaintenance,
        appointmentDate: this.appointmentDates[index],
        location: this.locations[index],
        status: 'Pending',
        user: { userId: this.userId } as User
    };
    console.log(newAppointment);
    this.appointmentService.addAppointment(newAppointment).subscribe(response => {
        console.log('Appointment added successfully', response);
    }, error => {
        console.error('Error adding appointment', error);
    });
}


  // Add the onInputChange method
  onInputChange(index: number): void {
    console.log(`Input changed at index: ${index}`);
  }
}