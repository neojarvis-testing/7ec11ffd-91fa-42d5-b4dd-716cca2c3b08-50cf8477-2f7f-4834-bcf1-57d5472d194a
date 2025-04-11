import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '../helpers/user-store.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AuthUser } from '../models/auth-user.model';

@Component({
  selector: 'app-adminnavbar',
  templateUrl: './adminnavbar.component.html',
  styleUrls: ['./adminnavbar.component.css']
})
export class AdminnavbarComponent implements OnInit {

  userName: any;
  userRole: any;
 
 
 
  constructor( private userStore :UserStoreService,private authService : AuthService,private router : Router) { }
 
  ngOnInit(): void {
    this.loadUserFromLocalStorage();
    this.userStore.user$.subscribe((user:AuthUser | null )=>{
      if(user){
        this.userName = user.name;
        this.userRole = user.role;
      }
    })
  }
 
  loadUserFromLocalStorage(): void {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
    const user: AuthUser = JSON.parse(storedUser);
    this.userStore.setUser(user);
   }
    }
 
     
  public logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
