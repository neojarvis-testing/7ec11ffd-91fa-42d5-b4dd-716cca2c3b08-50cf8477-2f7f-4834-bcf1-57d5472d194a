import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  localStorage : any = localStorage;
  role : string = "";
  private intervalId: any;
  private images: string[] = [
    'assets/background.webp',
    'assets/loginpage.png'
  ];
  public currentImage: string;
 
  constructor(public authService : AuthService) {
    this.currentImage = this.images[0];
  }
 
  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.changeBackgroundImage();
    }, 5000); // Change image every 5 seconds

    this.role = this.localStorage.getItem("userRole")
    console.log('User Role:',this.role);
    if(this.role == null){
      this.role = 'guest'
    }
  }
 
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
 
  private changeBackgroundImage(): void {
    const currentIndex = this.images.indexOf(this.currentImage);
    const nextIndex = (currentIndex + 1) % this.images.length;
    this.currentImage = this.images[nextIndex];
  }
  public isAdmin(): boolean {
    return localStorage.getItem('userRole') === 'ADMIN';
   }

 public isUser(): boolean {
   return localStorage.getItem('userRole') === 'USER';
 }
}

