import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Login } from '../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; // Reactive form group
  errorMessage: string = ''; // To display error messages

  constructor(
    private fb: FormBuilder, // FormBuilder for creating reactive forms
    private authService: AuthService, // Service for authentication
    private router: Router // For navigation
  ) {}

  ngOnInit(): void {
    // Initializing the reactive form with validators
    this.loginForm = this.fb.group({
      username: ['', Validators.required], // Username field must not be empty
      password: [
        '',
        [
          Validators.required, // Password field must not be empty
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
          ), // Complex pattern validation for password
        ],
      ],
    });
  }

  public onSubmit(): void {
    if (this.loginForm.valid) {
      let form:Login=this.loginForm.value;
      this.authService.login(form); // Call authService with form values
    } else {
      alert('Please fill out valid credentials before submitting.');
      this.errorMessage = 'Please enter valid credentials.'; // Show error message if form is invalid
    }
  }
}
