import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from '../services/feedback.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
 
@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit {
  feedbackForm: FormGroup;
  rating: number = 0; // Current selected rating
  maxRating: number = 5; // Maximum stars for rating
  appointmentId: number; 
  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute 
  ) {
    // Initialize the form with Reactive Forms
    this.feedbackForm = this.fb.group({
      message: ['', [Validators.required, Validators.minLength(10)]],
      rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }
 
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.appointmentId = Number(params.get('id')); // Extract the id from the route
      console.log('Received appointment ID:', this.appointmentId); // For debugging purposes
    });
    const userId = this.authService.getUserId();
    if (userId) {
      this.feedbackForm.addControl('user', this.fb.group({ userId: [parseInt(userId, 10)] }));
    }
  }
 
  // Set the rating when a star is clicked
  setRating(index: number): void {
    this.rating = index + 1; // Set the rating (1-based index)
    this.feedbackForm.controls['rating'].setValue(this.rating); // Update the form value
  }
 
  // Submit feedback
  public submitFeedback(): void {
    if (this.feedbackForm.valid) {
      this.feedbackService.createFeedback(this.feedbackForm.value,this.appointmentId).subscribe(() => {
        this.router.navigate(['/userviewfeedback']);
      }, error => {
        console.error('Error creating feedback:', error); // Log error for debugging
      });
    }
  }
}