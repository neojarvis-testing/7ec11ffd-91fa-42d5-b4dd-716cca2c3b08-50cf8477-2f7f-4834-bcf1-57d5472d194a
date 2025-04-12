import { Component, OnInit } from '@angular/core';
import { VehicleMaintenance } from '../models/vehicle-maintenance.model';
import { VehicleService } from '../services/vehicle.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';

@Component({
  selector: 'app-adminaddservice',
  templateUrl: './adminaddservice.component.html',
  styleUrls: ['./adminaddservice.component.css']
})
export class AdminaddserviceComponent implements OnInit {

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  vehiclemaintenance: VehicleMaintenance = { serviceName: "", servicePrice: 0, typeOfVehicle: "" };
  showPopup: boolean = false;
  serviceId: number | null = null;

  ngOnInit(): void {
    this.serviceId = parseInt(this.route.snapshot.paramMap.get('serviceId'));
    if (this.serviceId) {
      this.vehicleService.getServiceById(this.serviceId).subscribe(data => {
        this.vehiclemaintenance = data;
      });
    }
  }

  public addService(serviceForm: NgForm) {
    if (serviceForm.valid) {
      if (this.serviceId) {
        this.vehicleService.updateService(this.serviceId, this.vehiclemaintenance).subscribe(data => {
          this.showPopup = true;
        });
      } else {
        this.vehicleService.addService(this.vehiclemaintenance).subscribe(data => {
          serviceForm.reset();
          this.showPopup = true;
        });
      }
    }
  }

  closePopup() {
    this.showPopup = false;
    this.router.navigate(['/adminviewservice']);
  }
}
