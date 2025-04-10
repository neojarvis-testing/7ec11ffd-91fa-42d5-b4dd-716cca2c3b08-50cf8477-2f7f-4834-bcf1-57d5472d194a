import { Component, OnInit } from '@angular/core';
import { VehicleMaintenance } from '../models/vehicle-maintenance.model';

@Component({
  selector: 'app-useraddappointment',
  templateUrl: './useraddappointment.component.html',
  styleUrls: ['./useraddappointment.component.css']
})
export class UseraddappointmentComponent implements OnInit {
  services: VehicleMaintenance[];

  constructor() { }

  ngOnInit(): void {
    this.services = [
      { id: 1, name: 'Car Wash', price: 500, vehicle: 'Car' },
      { id: 2, name: 'Oil Change', price: 1200, vehicle: 'Bike' },
      { id: 3, name: 'Tire Rotation', price: 800, vehicle: 'Car' },
      { id: 4, name: 'Brake Inspection', price: 1500, vehicle: 'Truck' }
    ];
  }

  onInputChange(event: Event, row: any) {
    const date = (row.querySelector('.appointment-date') as HTMLInputElement).value;
    const location = (row.querySelector('.location') as HTMLInputElement).value;
    const button = row.querySelector('.add-appointment') as HTMLButtonElement;

    if (date && location) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  }
}
