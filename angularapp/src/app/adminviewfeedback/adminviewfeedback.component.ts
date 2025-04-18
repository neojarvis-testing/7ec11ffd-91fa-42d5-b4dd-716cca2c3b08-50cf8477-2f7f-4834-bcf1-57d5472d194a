import { Component, OnInit, OnDestroy } from '@angular/core';
import { FeedbackService } from '../services/feedback.service';
import { Feedback } from '../models/feedback.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit, OnDestroy {
  feedbacks: Feedback[] = [];
  deletePopupVisible: boolean = false;
  feedbackToDelete: Feedback | null = null;

  private subscriptions: Subscription = new Subscription(); // Manage multiple subscriptions

  constructor(private feedbackService: FeedbackService, private router: Router) {}

  ngOnInit(): void {
    this.getAllFeedbacks();
  }

  public getAllFeedbacks(): void {
    const feedbackSubscription = this.feedbackService.getAllFeedback().subscribe(data => {
      this.feedbacks = data;
    });
    this.subscriptions.add(feedbackSubscription);
  }

  public confirmDelete(feedback: Feedback): void {
    this.feedbackToDelete = feedback;
    this.deletePopupVisible = true;
  }

  public cancelDelete(): void {
    this.deletePopupVisible = false;
    this.feedbackToDelete = null;
  }

  public deleteFeedback(): void {
    if (this.feedbackToDelete) {
      const deleteSubscription = this.feedbackService.deleteFeedback(this.feedbackToDelete.feedbackId).subscribe(() => {
        // Refresh the feedback list after successful deletion
        this.getAllFeedbacks();
        this.cancelDelete(); // Close the popup
      });
      this.subscriptions.add(deleteSubscription);
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.subscriptions.unsubscribe();
  }
}
