import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../services/vehicle.service';
import { VehicleMaintenance } from '../models/vehicle-maintenance.model';

@Component({
  selector: 'app-adminviewdescription',
  templateUrl: './adminviewdescription.component.html',
  styleUrls: ['./adminviewdescription.component.css']
})
export class AdminviewdescriptionComponent implements OnInit {
  serviceId: number;
  serviceDetails: VehicleMaintenance;

  constructor(private route: ActivatedRoute, private vehicleService: VehicleService,private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.serviceId = +params['serviceId'];
      this.getServiceDetails();
    });
  }

  public getServiceDetails(): void {
    this.vehicleService.getServiceById(this.serviceId).subscribe(data => {
      this.serviceDetails = data;
    });
  }

  public goBack(){
    this.router.navigate(['/adminviewservice']);
  }
}
