import { Component } from '@angular/core';
import { Goal } from 'src/app/models/Goal';
import { GoalsService } from 'src/app/services/goals.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-man-goals',
  templateUrl: './man-goals.component.html',
  styleUrls: ['./man-goals.component.css']
})
export class ManagerGoalsComponent {
  displayColumns = ['name', 'description', 'deadline', 'status', 'weightage', 'comment']
  goals:Goal[] = [];
  
  constructor(private goalService:GoalsService, private emp:LoginService){ }
  ngOnInit(){
    this.goalService.getManagerGoals(this.emp.id).subscribe(json => this.goals = json);
  }
  negotiate(comments:string, id:number){
    this.goalService.negotiateGoal(comments, id).subscribe(json => {console.log(json); this.ngOnInit();});
    
  }
  accept(id:number){
    this.goalService.acceptGoal(id).subscribe(json => {console.log(json); this.ngOnInit();});
    
  }
}
