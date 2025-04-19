import { Component, OnInit, OnDestroy } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleMaintenance } from '../models/vehicle-maintenance.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-adminviewservice',
  templateUrl: './adminviewservice.component.html',
  styleUrls: ['./adminviewservice.component.css']
})
export class AdminviewserviceComponent implements OnInit, OnDestroy {

  newSearchVehicle: VehicleMaintenance = {
    serviceName: "", servicePrice: 0, typeOfVehicle: "",
    description: ''
  };
  searchData: string = "";
  vehiclemaintainance: VehicleMaintenance[] = [];
  private subscriptions: Subscription = new Subscription(); // Manage multiple subscriptions

  constructor(private vehicleService: VehicleService, private router: Router, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllServices();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.subscriptions.unsubscribe();
  }

  public getAllServices(): void {
    const serviceSubscription = this.vehicleService.getAllServices().subscribe(data => {
      this.vehiclemaintainance = data;
    });
    this.subscriptions.add(serviceSubscription);
  }

  public searchByServiceName(): void {
    const searchSubscription = this.vehicleService.getAllServices().subscribe(data => {
      this.vehiclemaintainance = data;
      this.vehiclemaintainance = this.vehiclemaintainance.filter(service => 
        service.serviceName.toLowerCase().includes(this.searchData.toLowerCase())
      );
    });
    this.subscriptions.add(searchSubscription);
  }

  public deleteService(serviceId: number): void {
    const deleteSubscription = this.vehicleService.deleteService(serviceId).subscribe({
      next: () => {
        this.getAllServices();
      },
      error: (err) => {
        if (err.status === 400) { // Assuming status code 400 means 'service already booked'
          alert('Service already booked.');
        } else {
          alert('Service already booked so cannot be deleted');
        }
      }
    });
  
    this.subscriptions.add(deleteSubscription);
  }

  public editService(serviceId: number): void {
    this.router.navigate(['/adminaddservice', serviceId]);
  }

  public viewServiceDescription(serviceId: number): void {
    this.router.navigate(['/adminviewdescription', serviceId]);
  }
}
