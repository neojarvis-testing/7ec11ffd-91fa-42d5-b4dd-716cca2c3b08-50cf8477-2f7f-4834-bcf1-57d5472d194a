import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-adminviewuserdetails',
  templateUrl: './adminviewuserdetails.component.html',
  styleUrls: ['./adminviewuserdetails.component.css']
})
export class AdminviewuserdetailsComponent implements OnInit {

  users: User[] = [];
  username: string = "";
  showPopup: boolean = false;
  popupMessage: string = "";
  user:User={userId: null,
    email: "",
    password: "",
    username: "",
    mobileNumber: "",
    userRole: ""}

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
      this.users=this.users.filter(u => u.userRole == 'User');
    });
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(data1 => {
      this.loadUsers();
    });
  }

  searchData() {
    if (this.username == "") {
      this.loadUsers();
    } else {
      const foundUser = this.users.find(u => u.username.toLowerCase() === this.username.toLowerCase());
      if (foundUser) {
        this.userService.getUserByName(this.username).subscribe(data2=>{
          this.user=data2;
        })
        this.popupMessage = "Found Customer";
      } else {
        this.popupMessage = "Customer not found.";
      }
      this.showPopup = true;
    }
  }

  closePopup() {
    this.showPopup = false;
    this.username = "";
    this.user={userId: null,
      email: "",
      password: "",
      username: "",
      mobileNumber: "",
      userRole: ""};
    this.loadUsers();
  }
}
