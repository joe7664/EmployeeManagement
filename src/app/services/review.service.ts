import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../models/Review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http:HttpClient) { }
  
  submitEmployeeReview(review:Review, id:number) : Observable<Review> {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.post<Review>("http://localhost:9000/performance/request/"+id,
        review, {headers: header})
  }
  viewEmployeeReviews(id:number) : Observable<Review[]> {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.get<Review[]>("http://localhost:9000/performance/get/"+id,
        {headers: header})
  }
}
