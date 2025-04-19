import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { AuthService } from '../services/auth.service';
import { Appointment } from '../models/appointment.model';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-adminnotification',
  templateUrl: './adminnotification.component.html',
  styleUrls: ['./adminnotification.component.css']
})
export class AdminNotificationComponent implements OnInit, OnDestroy {
  appointments: Appointment[] = []; // List of appointments
  userId: number | null = null; // Logged-in user ID
  appointmentId: number | null = null; // Selected appointment ID
  showPaymentPopup: boolean = false; // Controls visibility of payment popup
  selectedUserDetails: User | null = null; // To display details of the selected user

  private subscriptions: Subscription = new Subscription(); // Manages multiple subscriptions
  private notificationInterval: any; // Polling interval for fetching appointments

  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Fetch the user ID from AuthService
    const userIdString = this.authService.getUserId();
    this.userId = userIdString ? parseInt(userIdString, 10) : null;

    if (this.userId) {
      // Fetch appointments for the logged-in user
      this.appointmentService.getAppointmentsByUser(this.userId).subscribe({
        next: (appointments: Appointment[]) => {
          if (appointments.length > 0) {
            this.appointmentId = appointments[0].appointmentId; // Use the first appointment for simplicity
          }
        },
        error: (error: any) => {
          console.error('Error fetching appointments for user:', error);
        }
      });
    }

    // Fetch appointments initially and poll every 5 seconds
    this.fetchAppointments();
    this.notificationInterval = setInterval(() => this.fetchAppointments(), 5000);
  }

  // Fetch all appointments
  public fetchAppointments(): void {
    const appointmentSubscription = this.appointmentService.getAppointments().subscribe(data => {
      this.appointments = data; // Update the appointments list
    });
    this.subscriptions.add(appointmentSubscription);
  }

  // Handle request payment
  public requestPayment(appointment: Appointment): void {
    if (!this.userId || !appointment.appointmentId) {
      console.error('User ID or Appointment ID is missing');
      return;
    }

    const paymentSubscription = this.appointmentService.requestPayment(appointment.appointmentId, { responseType: 'text' as 'json' }).subscribe(
      (response: any) => {
        console.log(response); // Logs the plain text response
        this.showPaymentPopup = true; // Show the payment success popup
        setTimeout(() => (this.showPaymentPopup = false), 3000);

        // Create a notification after payment request
        this.createNotification(appointment);
      },
      (error: any) => {
        console.error('Error requesting payment:', error);
      }
    );
    this.subscriptions.add(paymentSubscription);
  }

  // Create a notification
  private createNotification(appointment: Appointment): void {
    if (!this.userId) {
      console.error('User ID is missing. Cannot create notification.');
      return;
    }

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
    const notification = {
      message: `Payment request for appointment #${appointment.appointmentId} has been initiated.`,
      isRead: false,
      timestamp:formattedDate, // Current timestamp
      user: { userId: this.userId }, // User ID
      appointment: { appointmentId: appointment.appointmentId } // Appointment ID
    };

    // Log the notification object or integrate with NotificationService
    console.log('Notification created:', notification);
  }

  // Fetch user details for the selected appointment
  public showUserProfile(userId: number): void {
    const userProfileSubscription = this.appointmentService.getUserDetails(userId).subscribe({
      next: (response: User) => {
        this.selectedUserDetails = response; // Assign the fetched user details
      },
      error: (error: any) => {
        console.error('Error fetching user details:', error);
      }
    });
    this.subscriptions.add(userProfileSubscription);
  }

  // Close the user details popup
  public closeUserDetails(): void {
    this.selectedUserDetails = null; // Clear the selected user details
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
