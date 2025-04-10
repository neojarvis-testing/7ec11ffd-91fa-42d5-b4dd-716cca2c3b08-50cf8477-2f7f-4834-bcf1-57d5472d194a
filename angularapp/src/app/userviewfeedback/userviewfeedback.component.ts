import { Component, OnInit } from '@angular/core';
import { Feedback } from '../models/feedback.model';
import { FeedbackService } from '../services/feedback.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent implements OnInit {

  feedbacks: Feedback[] = [];

  constructor(private feedbackService: FeedbackService, private router: Router) { }

  ngOnInit(): void {
    this.getAllFeedbacks();
  }

  getAllFeedbacks(): void {
    this.feedbackService.getAllFeedback().subscribe(data => {
      this.feedbacks = data;
    });
  }

  viewProfile(feedbackId: number): void {
    this.router.navigate(['/profile', feedbackId]);
  }

  deleteFeedback(feedbackId: number): void {
    this.feedbackService.deleteFeedback(feedbackId).subscribe(() => {
      this.getAllFeedbacks(); 
    });
  }
}
