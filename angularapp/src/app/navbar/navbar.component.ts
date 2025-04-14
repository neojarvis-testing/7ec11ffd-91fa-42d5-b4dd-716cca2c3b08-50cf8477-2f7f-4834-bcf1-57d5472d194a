import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
// import { UserStoreService } from 'src/app/helpers/user-store';
 
import { AuthService } from 'src/app/services/auth.service';
 
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 
  showLogoutPopup = false;
  isLoggedIn = false;
  userRole : string | null = null;
  username : string = null;
 
  private userSubscription : Subscription | null = null;
 
 
 
  constructor(
    private authService : AuthService,
    private router : Router,
    // private userStore : UserStoreService
 
    ) { }
 
  ngOnInit(): void {
 
    // this.updateUserState();
    // this.userSubscription = this.userStore.user$.subscribe(()=>{
    //   this.updateUserState();
    // })
 
 
  }
 
  // public updateUserState():void{
  //   this.isLoggedIn = this.userStore.isLoggedIn();
  //   this.username = this.userStore.authUser?.name;
  //   this.userRole = this.userStore.authUser?.role;
  // }
 
 
 
  // logout(){
  //   this.authService.logout();
  //   this.showLogoutPopup = false;
  //   this.router.navigate(['/login'])
  // }
  ngOnDestroy():void{
    if(this.userSubscription){
      this.userSubscription.unsubscribe();
    }
  }
 
}