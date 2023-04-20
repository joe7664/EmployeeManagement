import { Component } from '@angular/core';
import { Review } from '../models/Review';
import { ReviewService } from '../services/review.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent {
  displayColumns = ['deliverables', 'achievements', 'improvement', 'score']
  reviews:Review[] = [];
  
  constructor(private reviewService:ReviewService, private emp:LoginService){ }
  ngOnInit(){
    this.reviewService.viewEmployeeReviews(this.emp.id).subscribe(json => this.reviews = json);
  }
}
