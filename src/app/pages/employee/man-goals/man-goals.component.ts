import { Component, Input } from '@angular/core';
import { Goal } from 'src/app/models/Goal';
import { Review } from 'src/app/models/Review';
import { GoalsService } from 'src/app/services/goals.service';
import { LoginService } from 'src/app/services/login.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-man-goals',
  templateUrl: './man-goals.component.html',
  styleUrls: ['./man-goals.component.css']
})
export class ManagerGoalsComponent {
  displayColumns = ['name', 'description', 'deadline', 'status', 'weightage', 'comment', 'finish']
  @Input() goals:Goal[] = [];
  employeeReview:Review = {
    deliverables:"",
    achievements:"",
    areaOfImprovement:"",
    managerFeedback:"",
    score:0
  };
  goalId:number=0;
  review=false;
  
  constructor(private goalService:GoalsService, private emp:LoginService, private reviewService:ReviewService){ }
  ngOnInit(){
    this.goalService.getManagerGoals(this.emp.id).subscribe(json => this.goals = json);
  }
  negotiate(comments:string, id:number){
    this.goalService.negotiateGoal(comments, id).subscribe(json => {console.log(json); this.ngOnInit();});
    
  }
  accept(id:number){
    this.goalService.acceptGoal(id).subscribe(json => {console.log(json); this.ngOnInit(); console.log("Accepted goal: ",id)});
    
  }
  complete(id:number){
    this.goalId=id;
    this.goalService.completeGoal(id).subscribe(json => {console.log(json); this.ngOnInit();});
    this.review=true;
  }
  submit(employeeReview:Review){
    console.log("Goal ID: ", this.goalId)
    console.log(employeeReview)
    this.reviewService.submitEmployeeReview(employeeReview, this.goalId).subscribe(json => {console.log(json); console.log(this.goalId)});
    this.review=false;
  }
}
