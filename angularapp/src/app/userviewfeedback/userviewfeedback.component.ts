import { Component, OnInit } from '@angular/core';
import { Feedback } from '../models/feedback.model';
import { FeedbackService } from '../services/feedback.service';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent implements OnInit {

  feedbackId:number;
  feedbacks: Feedback[] = [];

  constructor(private feedbackService: FeedbackService, private router: Router, private activatedRoute: ActivatedRoute,private authService:AuthService) { }


  ngOnInit(): void {
    this.feedbackId=parseInt(this.authService.getUserId());
    this.getAllFeedbacks();
  }

  getAllFeedbacks(): void {
    this.feedbackService.getFeedbacksByUserId(this.feedbackId).subscribe(data => {
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
