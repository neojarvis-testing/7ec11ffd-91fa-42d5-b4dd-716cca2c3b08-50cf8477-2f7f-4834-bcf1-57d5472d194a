import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleMaintenance } from '../models/vehicle-maintenance.model';

@Component({
  selector: 'app-adminviewservice',
  templateUrl: './adminviewservice.component.html',
  styleUrls: ['./adminviewservice.component.css']
})
export class AdminviewserviceComponent implements OnInit {

  constructor(private vehicleService: VehicleService, private router: Router, private activatedroute: ActivatedRoute) { }
  
  newSearchVehicle: VehicleMaintenance = { serviceName: "", servicePrice: 0, typeOfVehicle: "" };
  searchData: string = "";
  vehiclemaintainance: VehicleMaintenance[] = [];

  ngOnInit(): void {
    this.getAllServices();
  }

  public getAllServices() {
    this.vehicleService.getAllServices().subscribe(data => {
      this.vehiclemaintainance = data;
    });
  }

  public searchByServiceName() {
    this.vehiclemaintainance = this.vehiclemaintainance.filter(service => 
      service.serviceName.toLowerCase().includes(this.searchData.toLowerCase())
    );
  }

  public deleteService(serviceId: number) {
    console.log(serviceId);
    this.vehicleService.deleteService(serviceId).subscribe(data => {
      this.getAllServices();
    });
  }

  public editService(serviceId: number) {
    this.router.navigate(['/adminaddservice', serviceId]);
  }
}
