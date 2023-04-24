import { Component } from '@angular/core';
import { Employee } from 'src/app/models/Employee';
import { Goal } from 'src/app/models/Goal';
import { GoalsService } from 'src/app/services/goals.service';
import { LoginService } from 'src/app/services/login.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  displayColumns = ['name', 'description', 'deadline']
  mId:number=0;
  employee:Employee = {
    managerId: 0
  }
  feedback:boolean=false;
  acceptedGoals:Goal[]=[];
  completedGoals:Goal[]=[];
  constructor(private emp:LoginService, private goal:GoalsService, private profile:ProfileService){
    this.profile.retrieveInfo(this.emp.id).subscribe(json => {
      this.employee = json
      if(this.employee.managerId!=undefined)
        this.mId=this.employee.managerId;
    });
  }
  ngOnInit(){
    this.goal.getGoalsByManagerId(this.mId).subscribe(json => this.completedGoals = json)
  }
}
