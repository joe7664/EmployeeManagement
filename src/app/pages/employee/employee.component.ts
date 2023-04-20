import { Component } from '@angular/core';
import { Leave } from 'src/app/models/Leave';
import { LeaveService } from 'src/app/services/leaves.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  switch=true;
  leaves:Leave[]=[];
  constructor(private leaveService:LeaveService, private emp:LoginService){}
  toggle(){
    this.switch=!this.switch;
  }
  refresh(){
    this.leaveService.viewLeaves(this.emp.id).subscribe(json => {this.leaves = json; console.log("Run 1")});
  }
}
