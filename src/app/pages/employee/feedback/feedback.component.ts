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
  displayColumns = ['name', 'description', 'deadline', 'comments']
  mId:number=0;
  employee:Employee = {
    managerId: 0
  }
  tempComment:string="";
  feedback:boolean=false;
  acceptedGoals:Goal[]=[];
  completedGoals:Goal[]=[];
  constructor(private goal:GoalsService, private profile:ProfileService){
  }
  ngOnInit(){
    this.profile.retrieveInfo().subscribe(json => {
      console.log(json)
      this.employee = json;
      if(this.employee.managerId!=undefined)
        this.mId=this.employee.managerId;
      this.goal.getGoalsByManagerId(this.mId).subscribe(data => {
        console.log(data)
        let tempGoal:Goal[]=[];
        for(let g of data){
          g.tempComment="";
          if(g.status=="Accepted" || g.status=="Completed"){
            tempGoal.push(g);
          }
        }
        this.completedGoals = tempGoal});
    });
  }
  submit(goalId:number, comment:string){
    this.goal.addComment(goalId, comment).subscribe(json => {console.log(json); this.ngOnInit();})
  }
}
