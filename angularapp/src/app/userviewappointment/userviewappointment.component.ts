import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../models/appointment.model';

@Component({
  selector: 'app-userviewappointment',
  templateUrl: './userviewappointment.component.html',
  styleUrls: ['./userviewappointment.component.css']
})
export class UserviewappointmentComponent implements OnInit {

  appointments:Appointment[]=[];
  selectedStatus:string="All";

  constructor(private appointmentService:AppointmentService) { }

  ngOnInit(): void {
  }

  // getAppoinments(){
  //   this.appointmentService.getAppointmentsByUser(userId).subscribe(data=>{
  //     this.appointments=data;
  //   })
  // }

  // getAppoinmentsByFilter(){
  //   if(this.selectedStatus=='All'){
  //     this.getAppoinments();
  //   }
  //   else
  //   this.appointmentService.getAppointmentsByUser(userId).subscribe(data=>{
  //      this.appointments=data;
  //      this.appointments=this.appointments.filter(a=>a.status == this.selectedStatus);
  //     })
  // }

}
