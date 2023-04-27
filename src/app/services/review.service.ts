import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../models/Review';
import { Goal } from '../models/Goal';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http:HttpClient, private emp:LoginService) { }
  
  submitEmployeeReview(review:Review, goalId:number) : Observable<String> {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.post("http://54.215.229.217:9000/performance/request/"+goalId,
        review, {responseType:"text"})
  }
  viewEmployeeReviews() : Observable<Review[]> {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.get<Review[]>("http://54.215.229.217:9000/performance/employee/"+this.emp.id,
        {headers: header})
  }
  updateReview(review:Review):Observable<string> {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.put("http://54.215.229.217:9000/performance/review/" + review.reviewNumber, 
    review, {responseType:"text"})

  }
}
