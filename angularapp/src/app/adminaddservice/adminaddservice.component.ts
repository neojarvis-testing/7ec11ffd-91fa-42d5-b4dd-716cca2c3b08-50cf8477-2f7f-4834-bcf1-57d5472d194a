import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from '../services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
 
@Component({
  selector: 'app-adminaddservice',
  templateUrl: './adminaddservice.component.html',
  styleUrls: ['./adminaddservice.component.css']
})
export class AdminaddserviceComponent implements OnInit, OnDestroy {
  serviceForm: FormGroup;
  showPopup: boolean = false;
  serviceId: number | null = null;
  private subscription: Subscription;
 
  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.serviceForm = this.fb.group({
      serviceName: ['', Validators.required],
      servicePrice: [0, [Validators.required, Validators.min(0)]],
      typeOfVehicle: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
 
  ngOnInit(): void {
    this.serviceId = parseInt(this.route.snapshot.paramMap.get('serviceId'));
    if (this.serviceId) {
      this.subscription = this.vehicleService.getServiceById(this.serviceId).subscribe(data => {
        this.serviceForm.patchValue(data);
      });
    }
  }
 
  public addService() {
    if (this.serviceForm.valid) {
      if (this.serviceId) {
        this.subscription = this.vehicleService.updateService(this.serviceId, this.serviceForm.value).subscribe(data => {
          this.showPopup = true;
        });
      } else {
        this.subscription = this.vehicleService.addService(this.serviceForm.value).subscribe(data => {
          this.serviceForm.reset();
          this.showPopup = true;
        });
      }
    }
  }
 
  closePopup() {
    this.showPopup = false;
    this.router.navigate(['/adminviewservice']);
  }
 
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
 