import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../models/appointment.model';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-adminnotification',
  templateUrl: './adminnotification.component.html',
  styleUrls: ['./adminnotification.component.css']
})
export class AdminNotificationComponent implements OnInit {
  appointments: Appointment[] = [];
  previousAppointmentCount: number = 0;

  constructor(
    private appointmentService: AppointmentService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.fetchAppointments();
    setInterval(() => this.fetchAppointments(), 5000); // Poll every 5 seconds
  }

  fetchAppointments(): void {
    this.appointmentService.getAppointments().subscribe(data => {
      if (data.length > this.previousAppointmentCount) {
        this.appointments = data.slice(this.previousAppointmentCount);
        this.previousAppointmentCount = data.length;
      }
    });
  }

  requestPayment(appointment: Appointment): void {
    this.appointmentService.requestPayment(appointment.appointmentId, { responseType: 'text' as 'json' }).subscribe(
      (response: any) => {
        console.log(response); // Logs the plain text response
      },
      (error: any) => {
        console.error('Error requesting payment:', error);
      }
    );
    }
}