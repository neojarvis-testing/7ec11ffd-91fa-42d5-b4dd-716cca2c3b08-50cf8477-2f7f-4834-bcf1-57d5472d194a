import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../models/appointment.model';
import { User } from '../models/user.model';
 
@Component({
  selector: 'app-adminnotification',
  templateUrl: './adminnotification.component.html',
  styleUrls: ['./adminnotification.component.css']
})
export class AdminNotificationComponent implements OnInit {
  
  appointments: Appointment[] = [];
  previousAppointmentCount: number = 0;
  selectedUserDetails: User | null = null; // To display details of the selected user
  showPaymentPopup: boolean = false; // To control the payment success popup
 
  constructor(private appointmentService: AppointmentService) {}
 
  ngOnInit(): void {
    this.fetchAppointments();
    setInterval(() => this.fetchAppointments(), 5000); // Poll every 5 seconds
  }
 
  public fetchAppointments(): void {
    this.appointmentService.getAppointments().subscribe(data => {
      if (data.length > this.previousAppointmentCount) {
        this.appointments = data.slice(this.previousAppointmentCount);
        this.previousAppointmentCount = data.length;
      }
    });
  }
 
  public requestPayment(appointment: Appointment): void {
    this.appointmentService.requestPayment(appointment.appointmentId, { responseType: 'text' as 'json' }).subscribe(
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
  }
 
  // Fetch user details for the selected appointment
  public showUserProfile(userId: number): void {
    this.appointmentService.getUserDetails(userId).subscribe(
      (response: User) => {
        this.selectedUserDetails = response;
        console.log('User Details:', this.selectedUserDetails);
      },
      (error: any) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
 
  // Close the user details popup
  public closeUserDetails(): void {
    this.selectedUserDetails = null;
  }
}