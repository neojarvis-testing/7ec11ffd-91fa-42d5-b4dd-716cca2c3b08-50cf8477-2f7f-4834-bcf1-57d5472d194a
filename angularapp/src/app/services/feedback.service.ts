import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feedback } from '../models/feedback.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

<<<<<<< HEAD
  public apiUrl="https://ide-ffeffbaeceacebdffabdaaaacfffbcfdda.premiumproject.examly.io/proxy/8080"
=======
  public apiUrl="https://ide-aeccfaadacfebcebdffabdaaaacfffbcfdda.premiumproject.examly.io/proxy/8080"
  
>>>>>>> d026229d3d9c9af112f489cdfece69f7d27fefde

  constructor(private httpClient:HttpClient) { }

  public createFeedback(feedback:Feedback):Observable<any>{
<<<<<<< HEAD
    return this.httpClient.post(this.apiUrl+"/feedback",feedback);
  }

  public getAllFeedback():Observable<any>{
    return this.httpClient.get(this.apiUrl+"/feedback")
  }

  public  deleteFeedback(feedbackId: number):Observable<any>{
    return this.httpClient.delete(this.apiUrl+"/feedback/"+feedbackId);
  }
=======
    return this.httpClient.post(this.apiUrl+"/api/feedback",feedback);
  }

  public getAllFeedback():Observable<any>{
    return this.httpClient.get(this.apiUrl+"/api/feedback")
  }

  public  deleteFeedback(feedbackId: number):Observable<any>{
    return this.httpClient.delete(this.apiUrl+"/api/feedback/"+feedbackId);
  }
  
>>>>>>> d026229d3d9c9af112f489cdfece69f7d27fefde

}
