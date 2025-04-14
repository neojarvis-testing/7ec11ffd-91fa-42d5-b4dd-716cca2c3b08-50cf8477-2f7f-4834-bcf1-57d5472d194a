import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Login } from '../models/login.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData: Login = { username: '', password: '' };
  errorMessage: string = '';
 
  constructor(private authService: AuthService,private router : Router) {}
  
  ngOnInit(): void {
    
  }
 
  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.authService.login(form.value);
      this.router.navigate(['/adminnavbar']);
    } else {
      this.errorMessage = 'Please enter valid credentials.';
    }
  }

  
}
