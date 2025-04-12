import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Feedback } from '../models/feedback.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {


  public apiUrl="https://ide-aeccfaadacfebcebdffabdaaaacfffbcfdda.premiumproject.examly.io/proxy/8080"
  
  constructor(private httpClient:HttpClient) { }

  // public createFeedback(feedback:Feedback):Observable<any>{
  //   return this.httpClient.post(this.apiUrl+"/feedback",feedback);
  // }

  // public getAllFeedback():Observable<any>{
  //   return this.httpClient.get(this.apiUrl+"/feedback")
  // }

  // public  deleteFeedback(feedbackId: number):Observable<any>{
  //   return this.httpClient.delete(this.apiUrl+"/feedback/"+feedbackId);
  // }

  public createFeedback(feedback: Feedback):Observable<any>{
    return this.httpClient.post(this.apiUrl+"/api/feedback",feedback);
  }

  public getAllFeedback():Observable<any>{
    return this.httpClient.get(this.apiUrl+"/api/feedback")
  }

  public  deleteFeedback(feedbackId: number):Observable<any>{
    return this.httpClient.delete(this.apiUrl+"/api/feedback/"+feedbackId);
  }

  public getFeedbackById(feedbackId:number):Observable<any>{
    return this.httpClient.get(this.apiUrl+"/api/feedback/"+feedbackId);
  }

  public updateFeedbackById(feedbackId:number,feedback:Feedback):Observable<any>{
    return this.httpClient.put(this.apiUrl+"/api/feedback/"+feedbackId,feedback);
  }
  

}
