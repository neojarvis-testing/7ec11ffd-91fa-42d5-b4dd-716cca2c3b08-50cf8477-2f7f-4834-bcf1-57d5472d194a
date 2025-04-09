import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../models/appointment.model';

@Component({
  selector: 'app-adminviewappointment',
  templateUrl: './adminviewappointment.component.html',
  styleUrls: ['./adminviewappointment.component.css']
})
export class AdminviewappointmentComponent implements OnInit {

  appointments:Appointment[]=[];

  constructor(private appointmentService:AppointmentService) { }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(){
    this.appointmentService.getAppointments().subscribe(data=>{
      this.appointments=data;
    })
  }

  deleteAppointment(appointmentId:number){
    this.appointmentService.deleteAppointment(appointmentId).subscribe(data1=>{
      this.loadAppointments();
    })
  }
}
