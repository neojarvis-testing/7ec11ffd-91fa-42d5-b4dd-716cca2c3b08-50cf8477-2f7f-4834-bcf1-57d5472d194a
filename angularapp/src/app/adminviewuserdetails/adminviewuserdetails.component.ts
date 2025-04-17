import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-adminviewuserdetails',
  templateUrl: './adminviewuserdetails.component.html',
  styleUrls: ['./adminviewuserdetails.component.css']
})
export class AdminviewuserdetailsComponent implements OnInit, OnDestroy {

  users: User[] = [];
  username: string = "";
  showPopup: boolean = false;
  popupMessage: string = "";
  user: User = {
    userId: null,
    email: "",
    password: "",
    username: "",
    mobileNumber: "",
    userRole: ""
  };

  private subscriptions: Subscription = new Subscription(); // Manage multiple subscriptions

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.subscriptions.unsubscribe();
  }

  public loadUsers(): void {
    const loadUsersSubscription = this.userService.getAllUsers().subscribe(data => {
      this.users = data;
      this.users = this.users.filter(u => u.userRole === 'User');
    });
    this.subscriptions.add(loadUsersSubscription);
  }

  public deleteUser(id: string): void {
    const deleteUserSubscription = this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
    this.subscriptions.add(deleteUserSubscription);
  }

  public searchData(): void {
    if (this.username === "") {
      this.loadUsers();
    } else {
      const foundUser = this.users.find(u => u.username.toLowerCase() === this.username.toLowerCase());
      if (foundUser) {
        const searchUserSubscription = this.userService.getUserByName(this.username).subscribe(data => {
          this.user = data;
        });
        this.subscriptions.add(searchUserSubscription);
        this.popupMessage = "Found Customer";
      } else {
        this.popupMessage = "Customer not found.";
      }
      this.showPopup = true;
    }
  }

  public closePopup(): void {
    this.showPopup = false;
    this.username = "";
    this.user = {
      userId: null,
      email: "",
      password: "",
      username: "",
      mobileNumber: "",
      userRole: ""
    };
    this.loadUsers();
  }
}
