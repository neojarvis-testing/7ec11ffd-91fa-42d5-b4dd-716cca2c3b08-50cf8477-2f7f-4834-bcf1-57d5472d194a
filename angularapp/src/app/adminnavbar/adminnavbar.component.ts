import { Component, OnInit } from '@angular/core';

import { UserStoreService } from '../helpers/user-store.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AuthUser } from '../models/auth-user.model';
import { User } from '../models/user.model';


@Component({
  selector: 'app-adminnavbar',
  templateUrl: './adminnavbar.component.html',
  styleUrls: ['./adminnavbar.component.css']
})
export class AdminnavbarComponent implements OnInit {


  userName: any;
  userRole: any;

  user:User={email:"",password:"",username:"",mobileNumber:"",userRole:""};
  
  constructor( private userStore :UserStoreService,private authService : AuthService,private router : Router) { }
 

  ngOnInit(): void {
  }

}
