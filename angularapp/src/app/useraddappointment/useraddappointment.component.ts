import { Component, OnInit, OnDestroy } from '@angular/core';
import { VehicleMaintenance } from '../models/vehicle-maintenance.model';
import { VehicleService } from '../services/vehicle.service';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../models/appointment.model';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-useraddappointment',
  templateUrl: './useraddappointment.component.html',
  styleUrls: ['./useraddappointment.component.css']
})
export class UseraddappointmentComponent implements OnInit, OnDestroy {
  // List of available services
  services: VehicleMaintenance[] = [];
  // Search term for filtering services
  searchData: string = "";

  // Logged in user's ID
  userId: number;

  // Popup form properties
  appointmentPopup: boolean = false;
  selectedService: VehicleMaintenance | null = null;
  selectedAppointmentDate: string = '';
  selectedLocation: string = '';
  dateInvalid: boolean = false; // Flag for date validity

  // Optional appointment-success confirmation popup
  showPopup: boolean = false;

  private subscriptions: Subscription = new Subscription(); // Manage multiple subscriptions

  constructor(
    private vehicleService: VehicleService,
    private appointmentService: AppointmentService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = parseInt(this.authService.getUserId(), 10);
    console.log("User ID:", this.userId);
    this.getAllServices();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subscriptions.unsubscribe();
  }

  // Fetch all available services from the back end
  public getAllServices(): void {
    const serviceSubscription = this.vehicleService.getAllServices().subscribe(data => {
      this.services = data;
    });
    this.subscriptions.add(serviceSubscription);
  }

  // Filter services based on the search term
  public searchByService(): void {
    const searchSubscription = this.vehicleService.getAllServices().subscribe(data => {
      this.services = data.filter(service =>
        service.serviceName.toLowerCase().includes(this.searchData.toLowerCase())
      );
    });
    this.subscriptions.add(searchSubscription);
  }

  // Open the appointment popup and set the selected service
  public openAppointmentPopup(service: VehicleMaintenance): void {
    this.selectedService = service;
    this.selectedAppointmentDate = '';
    this.selectedLocation = '';
    this.dateInvalid = false;
    this.appointmentPopup = true;
  }

  // Validate that the appointment date is in the future
  public validateDate(selectedDate: string): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for comparison
    const selected = new Date(selectedDate);
    
    if (selected <= today) {
      this.dateInvalid = true;
      this.selectedAppointmentDate = '';
      alert('Please select a future date.');
    } else {
      this.dateInvalid = false;
      this.selectedAppointmentDate = selectedDate;
    }
  }

  // Add the appointment using the popup's values, then close the popup
  public addAppointment(serviceId: number): void {
    if (!this.selectedAppointmentDate || !this.selectedLocation) {
      return;
    }
    const newAppointment: Appointment = {
      service: { serviceId: serviceId } as VehicleMaintenance,
      appointmentDate: this.selectedAppointmentDate,
      location: this.selectedLocation,
      status: 'Pending',
      user: { userId: this.userId } as User
    };

    console.log('Adding Appointment:', newAppointment);
    const addAppointmentSubscription = this.appointmentService.addAppointment(newAppointment).subscribe(response => {
      console.log('Appointment added successfully', response);
      // Optionally display a confirmation popup
      this.showPopup = true;
      // Close the appointment popup form
      this.appointmentPopup = false;
    }, error => {
      console.error('Error adding appointment', error);
    });
    this.subscriptions.add(addAppointmentSubscription);
  }

  // Close any open popup (the appointment form or the confirmation)
  public closePopup(): void {
    this.appointmentPopup = false;
    this.showPopup = false;
    // Optionally, refresh or navigate as needed
    this.router.navigate(['/useraddappointment']);
  }
}
