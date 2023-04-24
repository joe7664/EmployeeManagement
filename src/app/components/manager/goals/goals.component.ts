import { Component, Input } from '@angular/core';
import { Employee } from 'src/app/models/Employee';
import { Goal } from 'src/app/models/Goal';
import { ManagerServiceService } from 'src/app/services/manager-service.service';

let goalTemplate:Goal = {
  "id":1,
  "name":"example",
  "description":"Example",
  "deadline":new Date(),
  "status":"Pending",
  "weightage":100,
  "comments":"Example"

}
@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent {
  // @Input() employees:Employee[]=[]
  displayColumns = ['id', 'name', 'employee', 'description', 'deadline', 'status', 'weightage', 'comment']
  @Input() goals:Goal[] = []
  constructor(private managerService:ManagerServiceService){
    this.goals = [goalTemplate];
  }
  isEmpty(list : Goal[]) {
    if (list.length == 0) return false;
    return true;
  }
  ngOnInit() {
    // console.log(this.employees)
    // for (let emp of this.employees) {
    //   for (let goal of emp.goal as unknown as Goal[]) {
    //     goal.employee = emp.firstName + " " +  emp.lastName
    //     this.goals.push(goal);
    //   }
    // }
    // console.log(this.goals)
    // this.managerService.getEmployeeGoals().subscribe(data => {
    //   for (let el of data) {
    //     let employee = this.employees.find(employee => employee.id == el.employeeId) as unknown as Employee
    //     // console.log(employee)
    //     el.employee = employee.firstName as unknown as string + " " + employee.lastName;
    //   }
    //   this.goals = data
    // })
    console.log(this.goals);
  }
  refresh() {
    // console.log(this.employees)
    // for (let emp of this.employees) {
    //   for (let goal of emp.goal as unknown as Goal[]) {
    //     goal.employee = emp.firstName + " " +  emp.lastName
    //     this.goals.push(goal);
    //   }
    // }
    console.log(this.goals)

  }

}
