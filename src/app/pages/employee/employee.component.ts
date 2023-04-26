import { Component } from '@angular/core';
import { Goal } from 'src/app/models/Goal';
import { Leave } from 'src/app/models/Leave';
import { Notification } from 'src/app/models/Notification';
import { Review } from 'src/app/models/Review';
import { GoalsService } from 'src/app/services/goals.service';
import { LeaveService } from 'src/app/services/leaves.service';
import { ManagerServiceService } from 'src/app/services/manager-service.service';
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
  notifications:Notification[]=[];
  constructor(private leaveService:LeaveService, private reviewService:ReviewService, private goalService:GoalsService, private managerService:ManagerServiceService){
    this.getNotifications();
  }
  toggle(){
    this.switch=!this.switch;
  }
  refreshLeaves(){
    this.leaveService.viewLeaves().subscribe(json => {this.leaves = json; console.log("Refresh leaves")});
  }
  refreshMGoals(){
    this.reviewService.viewEmployeeReviews().subscribe(json => {this.reviews = json; console.log("Refresh goals")});
  }
  refreshReviews(){
    this.goalService.getManagerGoals().subscribe(json => {this.goals = json; console.log("Refresh reviews")});
  }
  
  getNotifications() {
    this.managerService.getNotifications().subscribe(data => {
      this.notifications = data
    })
  }
  refresh(event:any) {
    console.log("Refreshing Everything")
    this.refreshLeaves();
    this.getNotifications();
    this.refreshMGoals();
    this.refreshReviews()
  }
}
