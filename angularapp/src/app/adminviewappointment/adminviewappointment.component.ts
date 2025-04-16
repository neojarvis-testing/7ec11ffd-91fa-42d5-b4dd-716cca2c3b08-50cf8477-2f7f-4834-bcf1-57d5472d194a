import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../models/appointment.model';

@Component({
  selector: 'app-adminviewappointment',
  templateUrl: './adminviewappointment.component.html',
  styleUrls: ['./adminviewappointment.component.css']
})
export class AdminviewappointmentComponent implements OnInit {

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
    status: "",
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

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.loadAppointments();
  }

  public loadAppointments() {
    this.appointmentService.getAppointments().subscribe(data => {
      this.appointments = data;
    });
  }

  public deleteAppointment(appointmentId: number) {
    this.appointmentService.deleteAppointment(appointmentId).subscribe(data1 => {
      this.showDeletePopup = false;
      this.appointmentId = null;
      this.loadAppointments();
    });
  }

  public showPopup(id: number) {
    this.appointmentId = id;
    this.showDeletePopup = true;
  }

  public hidePopup() {
    this.showDeletePopup = false;
    this.appointmentId = null;
  }

  public searchData() {
    this.appointmentService.getAppointments().subscribe(data => {
      this.appointments = data;
      this.appointments = this.appointments.filter(b => JSON.stringify(b).toLowerCase().includes(this.inp.toLowerCase()));
    });
  }

  public updateStatus(appointment: Appointment) {
    this.appointmentService.updateAppointment(appointment.appointmentId, appointment).subscribe(data => {
      this.loadAppointments();
    });
  }
}
