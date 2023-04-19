import { Component } from '@angular/core';
import { Goal } from 'src/app/models/Goal';
import { GoalsService } from 'src/app/services/goals.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-emp-goals',
  templateUrl: './emp-goals.component.html',
  styleUrls: ['./emp-goals.component.css']
})
export class EmployeeGoalsComponent {
  displayColumns = ['id', 'name', 'description', 'deadline', 'status', 'weightage', 'comment']
  goals:Goal[] = [];
  
  constructor(private goalService:GoalsService, private emp:LoginService){
    this.goalService.getEmployeeGoals(this.emp.id).subscribe(json => this.goals = json);
  }

}
