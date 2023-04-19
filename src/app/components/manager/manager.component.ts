import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from 'src/app/models/Employee';
import { Goal } from 'src/app/models/Goal';
import { Leave } from 'src/app/models/Leave';
import { GoalsService } from 'src/app/services/goals.service';
import { LeaveService } from 'src/app/services/leaves.service';
import { ManagerServiceService } from 'src/app/services/manager-service.service';

export interface DialogData {
  leaves: Leave[];
  element:Leave;
  employees:Employee[];
}

@Component({
  selector: 'app-manager-component',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent {
  employees:Employee[] = []

  constructor(private managerService:ManagerServiceService, public dialog: MatDialog, private leaveService : LeaveService){}
  getEmployees(){
    this.managerService.getEmployees().subscribe(data => {
      for (let el of data) {
        el.selected = false;
      }
      this.employees = data
      
      console.log("EMPLOYEES", data)
    })

  }

  

  ngOnInit() {
    this.getEmployees();
  }
  

}


  // convertTime(time:string) : string{
  //   let timeArr = time.split(" ");
  //   if (timeArr[1] == "PM") timeArr[0] = timeArr[0].split(";")+12
  //   if (time.split(":")[0].length == 1) return "0"+time+":00"
  //   return time+":00";
  // }