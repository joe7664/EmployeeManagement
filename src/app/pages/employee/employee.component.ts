import { Component } from '@angular/core';
import { Goal } from 'src/app/models/Goal';
import { Leave } from 'src/app/models/Leave';
import { Review } from 'src/app/models/Review';
import { GoalsService } from 'src/app/services/goals.service';
import { LeaveService } from 'src/app/services/leaves.service';
import { LoginService } from 'src/app/services/login.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  switch=true;
  leaves:Leave[]=[];
  reviews:Review[]=[];
  goals:Goal[]=[];
  constructor(private leaveService:LeaveService, private reviewService:ReviewService, private goalService:GoalsService,private emp:LoginService){}
  toggle(){
    this.switch=!this.switch;
  }
  refreshLeaves(){
    this.leaveService.viewLeaves(this.emp.id).subscribe(json => {this.leaves = json; console.log("Refresh leaves")});
  }
  refreshMGoals(){
    this.reviewService.viewEmployeeReviews(this.emp.id).subscribe(json => {this.reviews = json; console.log("Refresh goals")});
  }
  refreshReviews(){
    this.goalService.getManagerGoals(this.emp.id).subscribe(json => {this.goals = json; console.log("Refresh reviews")});
  }
}
