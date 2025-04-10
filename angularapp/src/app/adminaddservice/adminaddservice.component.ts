import { Component, OnInit } from '@angular/core';
import { VehicleMaintenance } from '../models/vehicle-maintenance.model';
import { VehicleService } from '../services/vehicle.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
  id: number | null = null;

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.vehicleService.getServiceById(this.id).subscribe(data => {
        this.vehiclemaintenance = data;
      });
    }
  }

  public addService(serviceForm: NgForm) {
    if (serviceForm.valid) {
      if (this.id) {
        this.vehicleService.updateService(this.id, this.vehiclemaintenance).subscribe(() => {
          this.showPopup = true;
        });
      } else {
        this.vehicleService.addService(this.vehiclemaintenance).subscribe(() => {
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
