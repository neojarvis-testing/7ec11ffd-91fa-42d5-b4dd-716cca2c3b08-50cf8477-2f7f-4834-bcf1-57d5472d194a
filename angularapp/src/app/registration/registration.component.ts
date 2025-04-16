import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

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

  constructor(private authService: AuthService, private router: Router,private cdr:ChangeDetectorRef) {}

  ngOnInit(): void { }

  // Check if the username exists when the input loses focus.
  public onUsernameBlur(): void {
    if (this.user.username) {
      this.authService.checkUsername(this.user.username).subscribe((exists: boolean) => {
        this.usernameExists = exists;
      });
    }
  }

  // Check if the email is already registered when the input loses focus.
  public onEmailBlur(): void {
    if (this.user.email) {
      this.authService.checkEmail(this.user.email).subscribe((exists: boolean) => {
        this.emailExists = exists;
      });
    }
  }

  // Check if the mobile number exists when the input loses focus.
  public onMobileBlur(): void {
    if (this.user.mobileNumber) {
      this.authService.checkMobile(this.user.mobileNumber).subscribe((exists: boolean) => {
        this.mobileExists = exists;
      });
    }
  }

  // Called when the registration form is submitted.
  // Validates the form and calls the service to send an OTP.
  public onSubmit(registerForm: NgForm): void {
    console.log("from onSubmit");
    
    this.authService.sendOtp(this.user.email).subscribe(
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
        
  }

  // Starts the OTP countdown timer (30 seconds).
  public startOtpTimer(): void {
    console.log("Response from startOtpTimer");
    
    this.otpTime = 30; // Reset timer to 30 seconds
    this.updateOtpTimeDisplay();
    if (this.timerInterval) { clearInterval(this.timerInterval); }
    this.timerInterval = setInterval(() => {
      this.otpTime--;
      this.updateOtpTimeDisplay();
      if (this.otpTime <= 0) {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  // Updates the OTP timer display in mm:ss format.
  public updateOtpTimeDisplay(): void {
    const minutes = Math.floor(this.otpTime / 60);
    const seconds = this.otpTime % 60;
    this.otpTimeDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  // Called when the user clicks on "Verify OTP".
  // Validates the OTP and submits it for verification along with the user data.
  public verifyOtp(): void {
    this.otpSubmitted = true;
    if (!this.otp) { return; }
    this.authService.verifyOtpAndRegister(this.user, this.otp).subscribe(
      res => {
        alert('Registration successful!');
        if (this.timerInterval) { clearInterval(this.timerInterval); }
        this.router.navigate(['/login']);
      },
      err => {
        alert('Invalid or expired OTP. Please try again.');
      }
    );
  }

  // Allows the user to request a new OTP.
  public resendOtp(): void {
    this.authService.sendOtp(this.user.email).subscribe(
      res => {
        this.otpTime = 30; // Reset the timer to 30 seconds
        this.startOtpTimer();
      },
      err => {
        alert('Error resending OTP. Please try again.');
      }
    );
  }

  // Returns a masked version of the user’s email for display in the OTP popup.
  public getMaskedEmail(): string {
    if (!this.user.email) { return ''; }
    const [local, domain] = this.user.email.split('@');
    // Display only the last 4 characters of the local part
    const visibleChars = local.length > 4 ? local.slice(-4) : local;
    return '****' + visibleChars + '@' + domain;
  }

  // Optionally closes the OTP popup and returns to the registration form.
  public closeOtpPopup(): void {
    this.otpSent = false;
    if (this.timerInterval) { clearInterval(this.timerInterval); }
  }
}
