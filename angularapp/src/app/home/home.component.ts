import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private intervalId: any;
  private images: string[] = [
    'assets/background.webp',
    'assets/loginpage.png'
  ];
  public currentImage: string;
  public role: string = 'guest';

  constructor(public authService: AuthService, private cdr: ChangeDetectorRef) {
    this.currentImage = this.images[0];
  }

  ngOnInit(): void {
    // Start the image change interval
    this.intervalId = setInterval(() => {
      this.changeBackgroundImage();
    }, 5000); // Change image every 5 seconds

    // Retrieve user role from localStorage
    const storedRole = localStorage.getItem('userRole');
    this.role = storedRole ? storedRole : 'guest';
    console.log('User Role:', this.role);

    // Manually trigger change detection to ensure the component renders immediately
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    // Clear the interval to prevent memory leaks
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
    return localStorage.getItem('userRole') === 'Admin';
  }

  public isUser(): boolean {
    return localStorage.getItem('userRole') === 'User';
  }
}
