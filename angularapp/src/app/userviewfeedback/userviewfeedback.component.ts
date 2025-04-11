import { Component, OnInit } from '@angular/core';
import { Feedback } from '../models/feedback.model';
import { FeedbackService } from '../services/feedback.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})

export class UserviewfeedbackComponent implements OnInit {

  feedbacks: Feedback[] = [];
  showPopup: boolean = false;
  feedbackIdToDelete: number | null = null;

  constructor(private feedbackService: FeedbackService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllFeedbacks();
  }

  getAllFeedbacks(): void {
    this.feedbackService.getAllFeedback().subscribe(data => {
      this.feedbacks = data;
    });
  }

  showDeletePopup(feedbackId: number): void {
    this.feedbackIdToDelete = feedbackId;
    this.showPopup = true;
  }

  confirmDelete(): void {
    if (this.feedbackIdToDelete !== null) {
      this.feedbackService.deleteFeedback(this.feedbackIdToDelete).subscribe(() => {
        this.getAllFeedbacks();
        this.showPopup = false;
        this.feedbackIdToDelete = null;
      });
    }
  }

  cancelDelete(): void {
    this.showPopup = false;
    this.feedbackIdToDelete = null;
  }
}

