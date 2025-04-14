import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
  }

  login() {
    // this.authService.login(this.username, this.password).subscribe(response => {
    //   localStorage.setItem('token', response.token);
    //   alert('Login successful!');
    // }, error => {
    //   alert('Login failed! Please check your credentials.');
    // });
  }


}
