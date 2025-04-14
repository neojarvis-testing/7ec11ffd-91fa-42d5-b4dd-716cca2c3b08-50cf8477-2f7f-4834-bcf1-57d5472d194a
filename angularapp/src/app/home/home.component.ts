import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  localStorage : any = localStorage;
  role : string = "";
 
  constructor(public authService : AuthService) { }
 
  ngOnInit(): void {
    
    this.role = this.localStorage.getItem("userRole")
    console.log('User Role:',this.role);
    if(this.role == null){
      this.role = 'guest'
    }

  }
 
  public isAdmin(): boolean {
     return localStorage.getItem('userRole') === 'ADMIN';
    }
 
  public isUser(): boolean {
    return localStorage.getItem('userRole') === 'USER';
  }

}
