import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';
import { VehicleMaintenance } from '../models/vehicle-maintenance.model';

@Component({
  selector: 'app-adminaddservice',
  templateUrl: './adminaddservice.component.html',
  styleUrls: ['./adminaddservice.component.css']
})
export class AdminaddserviceComponent implements OnInit {

  constructor() { }
  
  vehiclemaintenance:VehicleMaintenance={serviceName:"",servicePrice:0,typeOfVehicle:""};

  ngOnInit(): void {
  }



}
