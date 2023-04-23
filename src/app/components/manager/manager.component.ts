import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from 'src/app/models/Employee';
import { Goal } from 'src/app/models/Goal';
import { Leave } from 'src/app/models/Leave';
import { Meeting } from 'src/app/models/Meeting';
import { Review } from 'src/app/models/Review';
import { GoalsService } from 'src/app/services/goals.service';
import { LeaveService } from 'src/app/services/leaves.service';
import { ManagerServiceService } from 'src/app/services/manager-service.service';

export interface DialogData {
  leaves: Leave[];
  element:Leave;
  employees:Employee[];
  employee:Employee
  review:Review
}

@Component({
  selector: 'app-manager-component',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent {
  employees:Employee[] = []
  goals: Goal[] = []
  reviews:Review[] = []
  meetings:Meeting[] = []

  constructor(private managerService:ManagerServiceService, public dialog: MatDialog, private leaveService : LeaveService){
    this.getEmployees();
  }
  getEmployees(){
    this.managerService.getEmployees().subscribe(data => {
      this.goals = []
      this.reviews = []
      console.log(data);
      for (let el of data) {
        el.selected = false;
        for (let goal of el.goal as unknown as Goal[]) {
          goal.employee = el.firstName + " " + el.lastName
          let review = goal.performanceReviews as unknown as Review
          if (review != null) {
            review.name = el.firstName + " " + el.lastName;
            this.reviews.push(review);
          }
          this.goals.push(goal)
        }
      }
      this.employees = data
      // console.log(data);
    })
    // console.log(this.reviews);

  }
  refresh(event:any) {
    console.log("Refreshing Everything")
    this.getEmployees();
  }

  

  ngOnInit() {
  }
  

}


  // convertTime(time:string) : string{
  //   let timeArr = time.split(" ");
  //   if (timeArr[1] == "PM") timeArr[0] = timeArr[0].split(";")+12
  //   if (time.split(":")[0].length == 1) return "0"+time+":00"
  //   return time+":00";
  // }