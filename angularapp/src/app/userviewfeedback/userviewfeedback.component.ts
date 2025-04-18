import { Component, OnInit, OnDestroy } from '@angular/core';
import { Feedback } from '../models/feedback.model';
import { FeedbackService } from '../services/feedback.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent implements OnInit, OnDestroy {
  feedbackId: number;
  feedbacks: Feedback[] = [];
  showPopup: boolean = false;
  feedbackIdToDelete: number | null = null;

  // Container to hold all subscriptions for proper cleanup
  private subscriptions: Subscription = new Subscription();

  constructor(
    private feedbackService: FeedbackService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.feedbackId = parseInt(this.authService.getUserId(), 10);
    this.getAllFeedbacks();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all active subscriptions to prevent memory leaks
    this.subscriptions.unsubscribe();
  }

  public getAllFeedbacks(): void {
    const sub = this.feedbackService.getFeedbacksByUserId(this.feedbackId).subscribe(data => {
      this.feedbacks = data;
    });
    this.subscriptions.add(sub);
  }

  public showDeletePopup(feedbackId: number): void {
    this.feedbackIdToDelete = feedbackId;
    this.showPopup = true;
  }

  public confirmDelete(): void {
    if (this.feedbackIdToDelete !== null) {
      const sub = this.feedbackService.deleteFeedback(this.feedbackIdToDelete).subscribe(() => {
        this.getAllFeedbacks();
        this.showPopup = false;
        this.feedbackIdToDelete = null;
      });
      this.subscriptions.add(sub);
    }
  }

  public cancelDelete(): void {
    this.showPopup = false;
    this.feedbackIdToDelete = null;
  }
}
