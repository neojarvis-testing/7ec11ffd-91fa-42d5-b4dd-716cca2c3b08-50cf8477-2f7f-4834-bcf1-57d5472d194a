import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '../helpers/user-store.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AuthUser } from '../models/auth-user.model';

@Component({
  selector: 'app-usernavbar',
  templateUrl: './usernavbar.component.html',
  styleUrls: ['./usernavbar.component.css']
})
export class UsernavbarComponent implements OnInit {

  userName: any;
userRole: any;
 
  constructor(private userStore :UserStoreService,private authService :AuthService,private router :Router) { }
 
  ngOnInit(): void {
    this.loadUserFromLocalStorage();
    this.userStore.user$.subscribe((user:AuthUser | null )=>{
      if(user){
        this.userName = user.username;
        this.userRole = user.userRole;
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
 
    logout(){
      this.authService.logout();
      this.router.navigate(['/login']);
 
    }

}
