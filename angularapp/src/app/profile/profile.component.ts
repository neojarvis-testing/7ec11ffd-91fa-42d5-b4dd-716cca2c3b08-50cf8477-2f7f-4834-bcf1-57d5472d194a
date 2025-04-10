import { Component, OnInit } from '@angular/core';
import { UserdetailsService } from '../services/userdetails.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  existUser:User={
    userId:null,
    username: "",
    email: "",
    mobileNumber: ""
  }
  
  wantToEdit=false;

  constructor(private userService:UserdetailsService) { }

  ngOnInit(): void {
    this.userService.getUserById(this.existUser.userId).subscribe(data=>{
          
    })
  }



}

