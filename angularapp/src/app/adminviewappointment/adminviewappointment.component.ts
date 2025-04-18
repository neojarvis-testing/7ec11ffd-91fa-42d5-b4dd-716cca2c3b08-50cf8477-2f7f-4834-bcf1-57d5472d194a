import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../models/appointment.model';
import { Subscription } from 'rxjs';
 
@Component({
  selector: 'app-adminviewappointment',
  templateUrl: './adminviewappointment.component.html',
  styleUrls: ['./adminviewappointment.component.css']
})
export class AdminviewappointmentComponent implements OnInit, OnDestroy {
 
  appointments: Appointment[] = [];
  updateAppointment: Appointment = {
    appointmentId: null,
    service: {
      serviceId: null,
      serviceName: "",
      servicePrice: null,
      typeOfVehicle: "",
      description:""
    },
    appointmentDate: "",
    location: "",
    status: "Pending", // Set default status to "Pending"
    user: {
      userId: null,
      email: "",
      username: "",
      mobileNumber: "",
      userRole: ""
    }
  };
 
  showDeletePopup: boolean = false;
  appointmentId: number | null = null;
  inp: string = "";
 
  private subscriptions: Subscription = new Subscription(); // Manage multiple subscriptions
 
  constructor(private appointmentService: AppointmentService) { }
 
  ngOnInit(): void {
    this.loadAppointments();
  }
 
  public loadAppointments(): void {
    const loadAppointmentsSubscription = this.appointmentService.getAppointments().subscribe(data => {
      this.appointments = data.map(appointment => ({
        ...appointment,
        status: appointment.status || 'Pending' // Ensure status is "Pending" if not set
      }));
    });
    this.subscriptions.add(loadAppointmentsSubscription);
  }
 
  public deleteAppointment(appointmentId: number): void {
    const deleteSubscription = this.appointmentService.deleteAppointment(appointmentId).subscribe(data1 => {
      this.showDeletePopup = false;
      this.appointmentId = null;
      this.loadAppointments();
    });
    this.subscriptions.add(deleteSubscription);
  }
 
  public showPopup(id: number): void {
    this.appointmentId = id;
    this.showDeletePopup = true;
  }
 
  public hidePopup(): void {
    this.showDeletePopup = false;
    this.appointmentId = null;
  }
 
  public searchData(): void {
    const searchSubscription = this.appointmentService.getAppointments().subscribe(data => {
      this.appointments = data;
      this.appointments = this.appointments.filter(b => JSON.stringify(b).toLowerCase().includes(this.inp.toLowerCase()));
    });
    this.subscriptions.add(searchSubscription);
  }
 
  public updateStatus(appointment: Appointment): void {
    const updateSubscription = this.appointmentService.updateAppointment(appointment.appointmentId, appointment).subscribe(data => {
      // Ensure the status is updated in the local appointments array
      const index = this.appointments.findIndex(a => a.appointmentId === appointment.appointmentId);
      if (index !== -1) {
        this.appointments[index].status = appointment.status;
      }
    });
    this.subscriptions.add(updateSubscription);
  }
 
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.subscriptions.unsubscribe();
  }
}