import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../services/feedback.service';
import { Feedback } from '../models/feedback.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {


  feedbacks: Feedback[] = [];
  feedbackId:number;

  constructor(private feedbackService:FeedbackService,private router:Router) { }

  ngOnInit(): void {
    this.getAllFeedbacks();
  }


  getAllFeedbacks() {
    this.feedbackService.getAllFeedback().subscribe(data=>{
      this.feedbacks=data;
    })
  }

 
  viewProfile(feedbackId: number){
    this.router.navigate(['/profile',feedbackId]);
  }

}

