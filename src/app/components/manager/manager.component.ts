import { Component } from '@angular/core';
import { Employee } from 'src/app/models/Employee';
import { ManagerServiceService } from 'src/app/services/manager-service.service';

@Component({
  selector: 'app-manager-component',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent {
  employees:Employee[] = []
  constructor(private managerService:ManagerServiceService){}
  getEmployees(){
    this.managerService.getEmployees().subscribe(data => {
      this.employees = data
      console.log("EMPLOYEES", data)
    })
  }
  ngOnInit() {
    this.getEmployees();
  }

}
