import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  // Registration form model
  user: User = { username: '', email: '', mobileNumber: '', password: '', userRole: '' };
  confirmPassword: string = '';

  // OTP-related properties
  otp: string = '';
  otpSent: boolean = false;            // When true, the registration form hides and OTP UI shows
  otpSubmitted: boolean = false;         // To flag an attempt to submit OTP (for error messaging)
  otpTime: number = 30;                  // OTP timer in seconds (set to 30 seconds)
  otpTimeDisplay: string = '';           // Timer display in mm:ss format
  timerInterval: any;

  // Duplicate check flags for username, email, and mobile number
  usernameExists: boolean = false;
  emailExists: boolean = false;
  mobileExists: boolean = false;

  private subscriptions: Subscription = new Subscription(); // Manage multiple subscriptions

  constructor(private authService: AuthService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    // Clear the timer interval to prevent memory leaks
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    // Unsubscribe from all active subscriptions
    this.subscriptions.unsubscribe();
  }

  public onUsernameBlur(): void {
    if (this.user.username) {
      const usernameSubscription = this.authService.checkUsername(this.user.username).subscribe((exists: boolean) => {
        this.usernameExists = exists;
      });
      this.subscriptions.add(usernameSubscription);
    }
  }

  public onEmailBlur(): void {
    if (this.user.email) {
      const emailSubscription = this.authService.checkEmail(this.user.email).subscribe((exists: boolean) => {
        this.emailExists = exists;
      });
      this.subscriptions.add(emailSubscription);
    }
  }

  public onMobileBlur(): void {
    if (this.user.mobileNumber) {
      const mobileSubscription = this.authService.checkMobile(this.user.mobileNumber).subscribe((exists: boolean) => {
        this.mobileExists = exists;
      });
      this.subscriptions.add(mobileSubscription);
    }
  }

  public onSubmit(registerForm: NgForm): void {
    console.log("from onSubmit");

    const otpSubscription = this.authService.sendOtp(this.user.email).subscribe(
      response => {
        console.log('Success Response:', response);
        if (response.status === 'success') {
          this.otpSent = true;
          this.cdr.detectChanges(); // Notify Angular to update the view
          this.startOtpTimer();
        } else {
          alert('Unexpected response from server. Please try again.');
        }
      },
      error => {
        console.error('Error Response:', error);
        console.error('Status Code:', error.status); // Log the status code of the error
        alert('Error sending OTP. Please try again.');
      }
    );
    this.subscriptions.add(otpSubscription);
  }

  public startOtpTimer(): void {
    this.otpTime = 30; // Reset timer to 30 seconds
    this.updateOtpTimeDisplay();
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.timerInterval = setInterval(() => {
      this.otpTime--;
      this.updateOtpTimeDisplay();
      if (this.otpTime <= 0) {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  public updateOtpTimeDisplay(): void {
    const minutes = Math.floor(this.otpTime / 60);
    const seconds = this.otpTime % 60;
    this.otpTimeDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  public verifyOtp(): void {
    this.otpSubmitted = true;
    if (!this.otp) {
      return;
    }
    const verifySubscription = this.authService.verifyOtpAndRegister(this.user, this.otp).subscribe(
      res => {
        alert('Registration successful!');
        if (this.timerInterval) {
          clearInterval(this.timerInterval);
        }
        this.router.navigate(['/login']);
      },
      err => {
        alert('Invalid or expired OTP. Please try again.');
      }
    );
    this.subscriptions.add(verifySubscription);
  }

  public resendOtp(): void {
    const resendSubscription = this.authService.sendOtp(this.user.email).subscribe(
      res => {
        this.otpTime = 30; // Reset the timer to 30 seconds
        this.startOtpTimer();
      },
      err => {
        alert('Error resending OTP. Please try again.');
      }
    );
    this.subscriptions.add(resendSubscription);
  }

  public getMaskedEmail(): string {
    if (!this.user.email) {
      return '';
    }
    const [local, domain] = this.user.email.split('@');
    const visibleChars = local.length > 4 ? local.slice(-4) : local;
    return '****' + visibleChars + '@' + domain;
  }

  public closeOtpPopup(): void {
    this.otpSent = false;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
}
