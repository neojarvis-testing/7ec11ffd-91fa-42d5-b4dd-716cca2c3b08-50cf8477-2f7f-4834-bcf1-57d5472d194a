import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Feedback } from '../models/feedback.model';
import { FeedbackService } from '../services/feedback.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit {

  feedback: Feedback = { message: "", rating: null, user: { userId: 1, email: "", password: "", username: "", mobileNumber: "", userRole: "" } };

  constructor(private feedbackService: FeedbackService, private router: Router) { }

  ngOnInit(): void {
  }

  submitFeedback(form: NgForm) {
    if (form.valid) {
      this.feedbackService.createFeedback(this.feedback).subscribe(data => {
        this.router.navigate(['/userviewfeedback']);
      });
    }
  }
}
