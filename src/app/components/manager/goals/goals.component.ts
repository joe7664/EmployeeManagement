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
  displayColumns = ['id', 'name', 'employee', 'description', 'deadline', 'status', 'weightage', 'comment']
  goals:Goal[] = []
  constructor(private managerService:ManagerServiceService){
    
  }
  ngOnInit() {
    this.managerService.getEmployeeGoals().subscribe(data => {
      for (let el of data) {
        console.log("EL", el)
        let employee = this.employees.find(employee => employee.id == el.employeeId) as unknown as Employee
        console.log(employee)
        el.employee = employee.firstName as unknown as string + " " + employee.lastName;
      }
      this.goals = data
    })
  }

}
