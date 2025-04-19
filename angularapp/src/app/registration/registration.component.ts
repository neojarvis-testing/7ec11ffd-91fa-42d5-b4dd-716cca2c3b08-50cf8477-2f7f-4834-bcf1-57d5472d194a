import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
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
 
  // Reactive form groups for registration & OTP verification
  registrationForm!: FormGroup;
  otpForm!: FormGroup;
 
  // Properties to toggle password visibility
  isPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;
 
  // OTP-related properties
  otpSent: boolean = false;             // When true, shows the OTP verification UI
  otpSubmitted: boolean = false;          // Flags an OTP submission attempt for error messages
  otpTime: number = 30;                   // OTP timer in seconds (set to 30 seconds)
  otpTimeDisplay: string = '';            // Timer display in mm:ss format
  timerInterval: any;
 
  // Duplicate check flags for username, email, and mobile number
  usernameExists: boolean = false;
  emailExists: boolean = false;
  mobileExists: boolean = false;
 
  private subscriptions: Subscription = new Subscription();
 
  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {}
 
  ngOnInit(): void {
    // Define the registration reactive form with custom password matching validator.
    this.registrationForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.pattern('^\\S+$') // No whitespaces allowed
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[-a-z0-9.]+\\.[a-z]{2,}')
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/)
      ]],
      confirmPassword: ['', Validators.required],
      mobileNumber: ['', [
        Validators.required,
        Validators.pattern('^[6-9][0-9]{9}$') // Must start with 6, 7, 8, or 9 and have 10 digits
      ]],
      userRole: ['', Validators.required]
    }, { validators: this.matchPasswords });
   
 
    // Define the OTP verification form.
    this.otpForm = this.fb.group({
      otp: ['', Validators.required]
    });
  }
 
  ngOnDestroy(): void {
    // Clear the OTP timer interval
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    // Unsubscribe from all active subscriptions.
    this.subscriptions.unsubscribe();
  }
 
  // Custom validator to match password and confirm password fields
  matchPasswords(group: AbstractControl): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
 
  public onUsernameBlur(): void {
    const username = this.registrationForm.get('username')?.value;
    if (username) {
      const usernameSubscription = this.authService.checkUsername(username)
        .subscribe((exists: boolean) => {
          this.usernameExists = exists;
        });
      this.subscriptions.add(usernameSubscription);
    }
  }
 
  public onEmailBlur(): void {
    const email = this.registrationForm.get('email')?.value;
    console.log(email);
    if (email) {
      const emailSubscription = this.authService.checkEmail(email)
        .subscribe((exists: boolean) => {
          this.emailExists = exists;
        });
      this.subscriptions.add(emailSubscription);
    }
  }
 
  public onMobileBlur(): void {
    const mobileNumber = this.registrationForm.get('mobileNumber')?.value;
    if (mobileNumber) {
      const mobileSubscription = this.authService.checkMobile(mobileNumber)
        .subscribe((exists: boolean) => {
          this.mobileExists = exists;
        });
      this.subscriptions.add(mobileSubscription);
    }
  }
 
  // Called when the registration form submits.
  public onSubmit(): void {
    // If the form is invalid, do not proceed.
    if (this.registrationForm.invalid) {
      return;
    }
 
    // Construct the user object from form values.
    const user: User = {
      username: this.registrationForm.get('username')?.value,
      email: this.registrationForm.get('email')?.value,
      mobileNumber: this.registrationForm.get('mobileNumber')?.value,
      password: this.registrationForm.get('password')?.value,
      userRole: this.registrationForm.get('userRole')?.value
    };
 
    const otpSubscription = this.authService.sendOtp(user.email)
      .subscribe(
        response => {
          if (response.status === 'success') {
            this.otpSent = true;
            this.cdr.detectChanges();
            this.startOtpTimer();
          } else {
            alert('Unexpected response from server. Please try again.');
          }
        },
        error => {
          console.error('Error sending OTP:', error);
          alert('Error sending OTP. Please try again.');
        }
      );
    this.subscriptions.add(otpSubscription);
  }
 
  public startOtpTimer(): void {
    // Reset the timer to 30 seconds and start the countdown.
    this.otpTime = 30;
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
 
  // Called when the OTP form is submitted.
  public verifyOtp(): void {
    this.otpSubmitted = true;
    // If OTP field is invalid, do not proceed.
    if (this.otpForm.invalid) {
      return;
    }
    const otpValue = this.otpForm.get('otp')?.value;
 
    // Rebuild the user object from registrationForm values.
    const user: User = {
      username: this.registrationForm.get('username')?.value,
      email: this.registrationForm.get('email')?.value,
      mobileNumber: this.registrationForm.get('mobileNumber')?.value,
      password: this.registrationForm.get('password')?.value,
      userRole: this.registrationForm.get('userRole')?.value
    };
 
    const verifySubscription = this.authService.verifyOtpAndRegister(user, otpValue)
      .subscribe(
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
    const email = this.registrationForm.get('email')?.value;
    const resendSubscription = this.authService.sendOtp(email)
      .subscribe(
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
 
  // Returns a masked version of the user's email.
  public getMaskedEmail(): string {
    const email = this.registrationForm.get('email')?.value;
    if (!email) {
      return '';
    }
    const [local, domain] = email.split('@');
    const visibleChars = local.length > 4 ? local.slice(-4) : local;
    return '****' + visibleChars + '@' + domain;
  }
 
  public closeOtpPopup(): void {
    this.otpSent = false;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
 
    // Method to toggle the visibility of the password field
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
 
  // Method to toggle the visibility of the confirm password field
  toggleConfirmPasswordVisibility(): void {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }
 
}
 
 
 
 
 
 