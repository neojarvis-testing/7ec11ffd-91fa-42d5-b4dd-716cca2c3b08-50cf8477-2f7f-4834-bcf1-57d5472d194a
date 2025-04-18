import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  localStorage : any = localStorage;
  role : string = "";
 
  constructor(public authService : AuthService) { }
 
  ngOnInit(): void {
    
    // this.role = this.localStorage.getItem("userRole")
    // console.log('User Role:',this.role);
    // if(this.role == null){
    //   this.role = 'guest'
    // }

  }
 
  // public isAdmin(): boolean {
  //    return localStorage.getItem('userRole') === 'Admin';
  //   }
 
  // public isUser(): boolean {
  //   return localStorage.getItem('userRole') === 'USER';
  // }
 
  // public isLoggedIn() : boolean{
  //   return this.authService.isLoggedIn();
  // }
  title = 'VroomDoc';
  
}
