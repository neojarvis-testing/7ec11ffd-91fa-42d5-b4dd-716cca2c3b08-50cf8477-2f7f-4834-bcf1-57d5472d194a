import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  password: string = '';
  confirmPassword: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: FormGroup): void {
    console.log('Form value:', form.value);
    console.log('Password:', this.password);
    console.log('Confirm Password:', this.confirmPassword);

    if (form.valid && this.password === this.confirmPassword) {
      const formData = form.value;
      alert("Registration successful:");
      console.log('Registration successful:', formData);
      // Add your registration logic here
    } else {
      console.log('Form is invalid or passwords do not match');
    }
  }

}