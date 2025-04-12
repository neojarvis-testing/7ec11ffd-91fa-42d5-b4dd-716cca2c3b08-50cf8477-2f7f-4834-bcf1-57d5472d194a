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

  feedback: Feedback = { message: "", rating: null, user: { userId: null, email: "", password: "", username: "", mobileNumber: "", userRole: "" } };

  constructor(private feedbackService: FeedbackService, private router: Router,private authService : AuthService) { }

  ngOnInit(): void {
    this.feedback.user.userId = parseInt(this.authService.getUserId());
  }

  submitFeedback(form: NgForm) {
    if (form.valid) {
      this.feedbackService.createFeedback(this.feedback).subscribe(data => {
        this.router.navigate(['/userviewfeedback']);
      });
    }
  }
}
