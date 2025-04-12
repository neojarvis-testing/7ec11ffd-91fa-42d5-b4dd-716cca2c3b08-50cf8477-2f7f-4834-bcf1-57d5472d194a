import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../models/appointment.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-adminviewappointment',
  templateUrl: './adminviewappointment.component.html',
  styleUrls: ['./adminviewappointment.component.css']
})
export class AdminviewappointmentComponent implements OnInit {

  appointments: Appointment[] = [];

  showDeletePopup: boolean = false;
  appointmentId: number | null = null;
  inp: string = "";

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentService.getAppointments().subscribe(data => {
      this.appointments = data;
    });
  }

  deleteAppointment(appointmentId: number) {
    this.appointmentService.deleteAppointment(appointmentId).subscribe(data1 => {
      this.showDeletePopup = false;
      this.appointmentId = null;
      this.loadAppointments();
    });
  }

  showPopup(id: number) {
    this.appointmentId = id;
    this.showDeletePopup = true;
  }

  hidePopup() {
    this.showDeletePopup = false;
    this.appointmentId = null;
  }

  searchData() {
    this.appointmentService.getAppointments().subscribe(data => {
      this.appointments = data;
      this.appointments = this.appointments.filter(b => JSON.stringify(b).toLowerCase().includes(this.inp.toLowerCase()));
    });
  }
}
