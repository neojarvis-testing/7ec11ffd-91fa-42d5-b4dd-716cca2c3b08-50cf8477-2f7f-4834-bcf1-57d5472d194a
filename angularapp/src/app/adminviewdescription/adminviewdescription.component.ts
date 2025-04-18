import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../services/vehicle.service';
import { VehicleMaintenance } from '../models/vehicle-maintenance.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-adminviewdescription',
  templateUrl: './adminviewdescription.component.html',
  styleUrls: ['./adminviewdescription.component.css']
})
export class AdminviewdescriptionComponent implements OnInit, OnDestroy {
  serviceId: number;
  serviceDetails: VehicleMaintenance;
  private subscriptions: Subscription = new Subscription(); // Manage multiple subscriptions

  constructor(private route: ActivatedRoute, private vehicleService: VehicleService, private router: Router) {}

  ngOnInit(): void {
    const routeSubscription = this.route.params.subscribe(params => {
      this.serviceId = +params['serviceId'];
      this.getServiceDetails();
    });
    this.subscriptions.add(routeSubscription);
  }

  public getServiceDetails(): void {
    const serviceSubscription = this.vehicleService.getServiceById(this.serviceId).subscribe(data => {
      this.serviceDetails = data;
    });
    this.subscriptions.add(serviceSubscription);
  }

  public goBack(): void {
    this.router.navigate(['/adminviewservice']);
  }

  ngOnDestroy(): void {
    // Clean up all subscriptions
    this.subscriptions.unsubscribe();
  }
}
