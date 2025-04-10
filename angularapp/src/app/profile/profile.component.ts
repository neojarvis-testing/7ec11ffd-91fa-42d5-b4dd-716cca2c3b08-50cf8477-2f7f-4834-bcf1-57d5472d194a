import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserdetailsService } from '../services/userdetails.service';
import { User } from '../models/user.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isEditMode: boolean = false;
  isProfileUpdated: boolean = false;

  user = {
    username: 'User1',
    email: 'user1@gmail.com',
    mobileNumber: '1234567890'
  };

  constructor(private userDetails: UserdetailsService) { }

  ngOnInit(): void { }

  showEditForm() {
    this.isEditMode = true;
    this.isProfileUpdated = false;
  }

  cancelEdit() {
    this.isEditMode = false;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      // Update user details
      this.user.username = form.value.username;
      this.user.email = form.value.email;
      this.user.mobileNumber = form.value.mobileNumber;
      this.isEditMode = false;
      this.isProfileUpdated = true;
    }
  }
}
