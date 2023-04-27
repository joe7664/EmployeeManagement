import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/models/Employee';
import { Goal } from 'src/app/models/Goal';
import { Meeting } from 'src/app/models/Meeting';
import { MeetingMan } from 'src/app/models/MeetingMan';
import { GoalsService } from 'src/app/services/goals.service';
import { ManagerServiceService } from 'src/app/services/manager-service.service';
import { DialogData } from '../manager.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {
  employees:Employee[] = []
  endDate:Date = new Date()
  startDate:Date = new Date()
  displayedColumns: string[] = ['Check', 'First Name', 'Last Name', 'Email', 'Availability'];
  constructor(private managerService:ManagerServiceService, public dialog: MatDialog,){}
  getEmployees(){
    this.managerService.getEmployees().subscribe(data => {
      for (let el of data) {
        el.selected = false;
      }
      this.employees = data
    })

  }
  getAvailability(employee:Employee) {
    const dialogRef = this.dialog.open(MeetingRequest, {
      data: {
        employee:employee,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  getSelected() {
    let temp : Employee[] = []
    for (let el of this.employees) {
      if (el.selected) temp.push(el)
    }
    return temp;

  }

  findAvailable() {
    this.managerService.findAvailableEmployees({"startDate":this.startDate,"endDate":this.endDate, "status":"Submitted"}).subscribe(data => {
      console.log("AVAILABLE", data)
      this.employees = data;
    })
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      data: {
        employees:this.getSelected(),
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ngOnInit(){
    this.getEmployees()
  }


}


let goalTemplate:Goal = {
  name:"",
  description:"",
  deadline:undefined,
  weightage:0,
  personal:1,
}
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'goal.component.html',
})
export class DialogContentExampleDialog {
  employees:Employee[] = []
  goal:Goal 
  errorMessage:string
  constructor(public dialogRef: MatDialogRef<DialogContentExampleDialog>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private goalService:GoalsService) {
    this.employees = this.data.employees
    this.goal = goalTemplate;
    this.goal.deadline = new Date();
    this.errorMessage = ""
  }
  log() {
    for (let employee of this.employees) {
      if (typeof this.goal.weightage !== "number") {
        this.errorMessage = "Please input a number for weightage"
      }
      else if (employee.id !== undefined)
        this.goalService.addGoal(this.goal, employee.id).subscribe(json=> {
          console.log(json);
          this.goal.name = "";
          this.goal.weightage = 0;
          this.goal.description = "";
          this.goal.deadline = new Date();
          this.closeDialog()
        })
      else console.log("Employee ID is undefined", employee)
    }
  }
  ngOnInit() {
    console.log(this.employees);
  }
  closeDialog() {
    this.dialogRef.close()
  }
}

let meetingTemplate:MeetingMan = {
  "description":"",
  "startTime":"",
  "endTime":"",
  "subject":"",
  "employeeId":0,
}
@Component({
  selector: 'meeting-request',
  templateUrl: 'meetingRequest.component.html',
})
export class MeetingRequest {
  employee:Employee;
  meeting:MeetingMan;
  startTime:string;
  endTime:string;
  day:Date;
  errorMessage:string
  constructor(public dialogRef: MatDialogRef<DialogContentExampleDialog>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private managerService:ManagerServiceService) {
    this.employee = this.data.employee
    this.meeting = meetingTemplate;
    this.meeting.employeeId = this.employee.id
    this.startTime = "12:00"
    this.endTime = "13:00"
    this.day = new Date();
    this.errorMessage = ""
  }
  log() {
    console.log(this.startTime.split(":")[0])
  }
  submit() {
    this.day.setMinutes(0)
    let start = new Date(this.day);
    let end = new Date(this.day)
    console.log(start.toISOString());
    start.setHours(this.startTime.split(":")[0] as unknown as number)
    start.setMinutes(this.startTime.split(":")[1] as unknown as number)
    end.setHours(this.endTime.split(":")[0] as unknown as number)
    end.setMinutes(this.endTime.split(":")[1] as unknown as number)
    this.meeting.startTime = start.toISOString();
    this.meeting.endTime = end.toISOString();
    this.managerService.postMeeting(this.meeting).subscribe(data => {
      this.closeDialog()
    })
  }
  ngOnInit() {
    console.log(this.employee);
  }
  closeDialog() {
    this.dialogRef.close()
  }
}