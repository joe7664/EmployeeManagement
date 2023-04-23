import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../models/Review';
import { Goal } from '../models/Goal';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http:HttpClient) { }
  
  submitEmployeeReview(review:Review, goalId:number) : Observable<String> {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.post("http://localhost:9000/performance/request/"+goalId,
        review, {responseType:"text"})
  }
  viewEmployeeReviews(id:number) : Observable<Review[]> {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.get<Review[]>("http://localhost:9000/performance/reviews/"+id,
        {headers: header})
  }
}
