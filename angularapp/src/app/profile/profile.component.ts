import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { FeedbackService } from '../services/feedback.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';
import { Feedback } from '../models/feedback.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  isEditMode: boolean = false;
  isProfileUpdated: boolean = false;

  user: User = { userId: null, email: "", password: "", username: "", mobileNumber: "", userRole: "" };
  feedback: Feedback = { message: '', rating: null, user: { userId: null, email: '', password: '', username: '', mobileNumber: '', userRole: '' } };

  private subscriptions: Subscription = new Subscription(); // Manage multiple subscriptions

  constructor(
    private userService: UserService,
    private feedbackService: FeedbackService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const feedbackId = this.route.snapshot.paramMap.get('feedbackId');
    if (feedbackId) {
      const feedbackSubscription = this.feedbackService.getFeedbackById(Number(feedbackId)).subscribe(
        feedback => {
          if (feedback && feedback.user && feedback.user.userId) {
            const userId = feedback.user.userId;
            const userSubscription = this.userService.getUserById(userId.toString()).subscribe(
              (data: User) => this.handleUserData(data),
              (error: any) => this.handleError(error)
            );
            this.subscriptions.add(userSubscription);
          } else {
            console.error('User ID not found in feedback');
            // Handle error, e.g., navigate to an error page or show a message
          }
        },
        (error: any) => this.handleError(error)
      );
      this.subscriptions.add(feedbackSubscription);
    } else {
      console.error('Feedback ID not found');
      // Handle error, e.g., navigate to an error page or show a message
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.subscriptions.unsubscribe();
  }

  public handleUserData(data: User): void {
    this.user = data;
  }

  public handleError(error: any): void {
    console.error('Error fetching user details', error);
    // Handle error, e.g., navigate to an error page or show a message
  }

  public showEditForm(): void {
    this.isEditMode = true;
    this.isProfileUpdated = false;
  }

  public cancelEdit(): void {
    this.isEditMode = false;
    this.router.navigate(['/feedbacks']); // Navigate to the list of feedbacks page
  }

  public onSubmit(form: NgForm): void {
    if (form.valid) {
      const userId = this.user.userId;
      if (userId) {
        const updateSubscription = this.userService.updateUserProfile(userId, this.user).subscribe(
          (data: User) => this.handleUpdateSuccess(data),
          (error: any) => this.handleError(error)
        );
        this.subscriptions.add(updateSubscription);
      } else {
        console.error('User ID not found');
        // Handle error, e.g., navigate to an error page or show a message
      }
    }
  }

  public handleUpdateSuccess(data: User): void {
    this.user = data;
    this.isEditMode = false;
    this.isProfileUpdated = true;
  }

  public navigateToFeedbacks(): void {
    this.router.navigate(['/adminviewfeedback']); // Navigate to the list of feedbacks page
  }
}
