import { Component, OnInit } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: User = { username: '', email: '', mobileNumber: '', password: '', userRole: '' }; 
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(registerForm: NgForm): void {
    if (!registerForm.valid) {
      alert('Please fill in all required fields correctly!');
      return;
    }

    this.authService.register(this.user).subscribe(
      (data) => {
        console.log(data);
        alert('User registered successfully!');
        this.router.navigate(['/login']); 
      },
      () => {
        alert('Registration failed. Please try again.');
      }
    );
  }
}