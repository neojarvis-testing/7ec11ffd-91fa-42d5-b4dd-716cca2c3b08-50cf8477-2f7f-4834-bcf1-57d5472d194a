import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../models/appointment.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-userviewappointment',
  templateUrl: './userviewappointment.component.html',
  styleUrls: ['./userviewappointment.component.css']
})
export class UserviewappointmentComponent implements OnInit {

  appointments:Appointment[]=[];
  selectedStatus:string="All";
  inp:string="";
  userId:number|null;

  constructor(private appointmentService:AppointmentService,private authService:AuthService) { }

  ngOnInit(): void {
    this.userId=parseInt(this.authService.getUserId());
    this.getAppoinments();
  }

  getAppoinments(){
    this.appointmentService.getAppointmentsByUser(this.userId).subscribe(data=>{
      this.appointments=data;
    })
  }

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

  getAppoinmentsByFilter(){
      if(this.selectedStatus=='All'){
         this.appointments;
      }
      else
      // this.appointmentService.getAppointmentsByUser(userId).subscribe(data=>{
      //    this.appointments=data;
         this.appointments=this.appointments.filter(a=>a.status == this.selectedStatus);
        // })
    }

    searchData(){
      // this.appointmentService.getAppointmentsByUser(userId).subscribe(data=>{
      //    this.appointments=data;
      this.appointments=this.appointments.filter(b=>JSON.stringify(b).toLowerCase().includes(this.inp.toLowerCase()));
      // })
    }
}
