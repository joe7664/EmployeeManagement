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
  displayColumns = ['name', 'description', 'deadline', 'status', 'weightage']
  goals:Goal[] = [];
  
  constructor(private goalService:GoalsService){
    this.goalService.getEmployeeGoals().subscribe(json => this.goals = json);
  }

}
