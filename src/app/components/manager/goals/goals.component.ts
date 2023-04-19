import { Component, Input } from '@angular/core';
import { Employee } from 'src/app/models/Employee';
import { Goal } from 'src/app/models/Goal';
import { ManagerServiceService } from 'src/app/services/manager-service.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent {
  @Input() employees:Employee[]=[]
  displayColumns = ['id', 'name', 'description', 'deadline', 'status', 'weightage', 'comment']
  goals:Goal[] = []
  constructor(private managerService:ManagerServiceService){
    this.managerService.getEmployeeGoals().subscribe(data => {
      this.goals = data;
    })
  }

}
