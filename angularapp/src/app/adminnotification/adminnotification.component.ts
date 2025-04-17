import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../models/appointment.model';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-adminnotification',
  templateUrl: './adminnotification.component.html',
  styleUrls: ['./adminnotification.component.css']
})
export class AdminNotificationComponent implements OnInit, OnDestroy {
  
  appointments: Appointment[] = [];
  previousAppointmentCount: number = 0;
  selectedUserDetails: User | null = null; // To display details of the selected user
  showPaymentPopup: boolean = false; // To control the payment success popup

  private subscriptions: Subscription = new Subscription(); // Manage multiple subscriptions
  private notificationInterval: any; // For setInterval

  constructor(private appointmentService: AppointmentService) {}
 
  ngOnInit(): void {
    this.fetchAppointments();

    // Set up polling with setInterval
    this.notificationInterval = setInterval(() => this.fetchAppointments(), 5000);
  }
 
  public fetchAppointments(): void {
    const appointmentSubscription = this.appointmentService.getAppointments().subscribe(data => {
      if (data.length > this.previousAppointmentCount) {
        this.appointments = data.slice(this.previousAppointmentCount);
        this.previousAppointmentCount = data.length;
      }
    });
    this.subscriptions.add(appointmentSubscription);
  }
 
  public requestPayment(appointment: Appointment): void {
    const paymentSubscription = this.appointmentService.requestPayment(appointment.appointmentId, { responseType: 'text' as 'json' }).subscribe(
      (response: any) => {
        console.log(response); // Logs the plain text response
        this.showPaymentPopup = true; // Show the payment success popup
        setTimeout(() => {
          this.showPaymentPopup = false; // Hide the popup after 3 seconds
        }, 3000);
      },
      (error: any) => {
        console.error('Error requesting payment:', error);
      }
    );
    this.subscriptions.add(paymentSubscription);
  }
 
  // Fetch user details for the selected appointment
  public showUserProfile(userId: number): void {
    const userProfileSubscription = this.appointmentService.getUserDetails(userId).subscribe(
      (response: User) => {
        this.selectedUserDetails = response;
        console.log('User Details:', this.selectedUserDetails);
      },
      (error: any) => {
        console.error('Error fetching user details:', error);
      }
    );
    this.subscriptions.add(userProfileSubscription);
  }
 
  // Close the user details popup
  public closeUserDetails(): void {
    this.selectedUserDetails = null;
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.subscriptions.unsubscribe();

    // Clear the polling interval
    if (this.notificationInterval) {
      clearInterval(this.notificationInterval);
    }
  }
}
