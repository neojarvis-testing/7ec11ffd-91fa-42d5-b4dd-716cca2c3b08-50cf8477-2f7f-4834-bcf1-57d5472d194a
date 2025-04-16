import { Component, OnInit, OnDestroy } from '@angular/core';
 
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
 
  constructor() {
    this.currentImage = this.images[0];
  }
 
  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.changeBackgroundImage();
    }, 5000); // Change image every 5 seconds
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
}


