import { Component } from '@angular/core';
import { Review } from 'src/app/models/Review';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {

  reviewColumns = ['id', 'deliverable', 'achievements', 'areaOfImprovement', 'score', 'feedback']
  reviews:Review[] = []
  constructor(private adminService: AdminService) {
    this.adminService.getReviews().subscribe(data => {
      this.reviews = data;
      console.log(data)
    })
  }
}
