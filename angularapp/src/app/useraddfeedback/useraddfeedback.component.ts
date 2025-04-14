import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Feedback } from '../models/feedback.model';
import { FeedbackService } from '../services/feedback.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
 
@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit {
  feedback: Feedback = { message: '', rating: null, user: { userId: null, email: '', password: '', username: '', mobileNumber: '', userRole: '' } };
 
  constructor(
    private feedbackService: FeedbackService,
    private router: Router,
    private authService: AuthService
  ) {}
 
  ngOnInit(): void {
    const userId = this.authService.getUserId();
    this.feedback.user.userId = userId ? parseInt(userId, 10) : null; // Handle invalid userId gracefully
  }
 
  submitFeedback(form: NgForm): void {
    if (form.valid) {
      this.feedbackService.createFeedback(this.feedback).subscribe(() => {
        this.router.navigate(['/userviewfeedback']);
      }, error => {
        console.error('Error creating feedback:', error); // Log error for debugging
      });
    }
  }
}
 