import { Component, Input } from '@angular/core';
import { Employee } from 'src/app/models/Employee';
import { Review } from 'src/app/models/Review';
import { ManagerServiceService } from 'src/app/services/manager-service.service';

@Component({
  selector: 'app-performance-review',
  templateUrl: './performance-review.component.html',
  styleUrls: ['./performance-review.component.css']
})
export class PerformanceReviewComponent {
  @Input() employees:Employee[] = []
  reviews:Review[] = []
  constructor(private managerService:ManagerServiceService) {
  }
  ngOnInit() {
    // this.managerService.getPerformanceReviews().subscribe(data => {
    //   console.log(data);
    // })
  }
  log() {
    console.log(this.employees)
  }
}
