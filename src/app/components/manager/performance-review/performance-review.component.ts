import { Component, Input } from '@angular/core';
import { Employee } from 'src/app/models/Employee';

@Component({
  selector: 'app-performance-review',
  templateUrl: './performance-review.component.html',
  styleUrls: ['./performance-review.component.css']
})
export class PerformanceReviewComponent {
  @Input() employees:Employee[] = []
  constructor() {
  }
  ngOnInit() {
  }
  log() {
    console.log(this.employees)
  }
}
