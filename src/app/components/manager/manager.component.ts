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
  leaves:Leave[] = []
  endDate:Date = new Date()
  startDate:Date = new Date()
  searchName:string = ""
  fullLeaves:Leave[] = []
  leaveColumns = ['name', 'startDate', 'endDate', 'status', 'notes','feedback', 'action']

  displayedColumns: string[] = ['Check', 'First Name', 'Last Name', 'Email', 'Availability'];
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
  searchChange(name:string) {
    console.log(name)
    let x:Leave[] = []
    x = this.fullLeaves.filter(el => {
      return el.firstname?.toLowerCase()?.startsWith(name.toLowerCase()) || el.lastname?.toLowerCase()?.startsWith(name.toLowerCase())
    })
    this.leaves = x
  }
  getAvailability(employeeID:number) {
    // this.managerService.getEmployeeLeave(employeeID).subscribe(data=> {
    //   console.log("DATA", data)
      // this.openDialog(data)
    // })
  }
  findAvailable() {
    this.managerService.findAvailableEmployees({"startDate":this.startDate,"endDate":this.endDate, "status":"Submitted"}).subscribe(data => {
      console.log("AVAILABLE", data)
      this.employees = data;
    })
  }
  openLeaveAction(element:Leave) {
    const dialogRef = this.dialog.open(LeaveAction, {
      data: {
        element,
        leaves:this.leaves
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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
  getSelected() {
    let temp : Employee[] = []
    for (let el of this.employees) {
      if (el.selected) temp.push(el)
    }
    return temp;

  }
  ngOnInit() {
    this.getEmployees();
    this.managerService.getLeaveRequests().subscribe(json => {
      let temp : Leave[]= []
      json.map((el) => {
        if (el.status == "Submitted") {
          temp.push(el)
        };
      })
      for (let el of json) {
        if (el.status !== "Submitted") {
           temp.push(el);
        }
      }
      this.leaves = temp
      this.fullLeaves = temp;
      console.log(this.leaves)
    })
  }
  

}
let goalTemplate:Goal = {
  name:"",
  description:"",
  deadline:undefined,
  weightage:0,
}
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './goal.component.html',
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
@Component({
  selector: 'leave-action',
  templateUrl: 'leave.component.html',
})
export class LeaveAction {
  element:Leave = {}
  leaves:Leave[]=[]
  feedback:string = ""
  constructor(public dialogRef: MatDialogRef<LeaveAction>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private leaveService:LeaveService) {
    this.element = this.data.element;
    this.leaves = this.data.leaves;
  }
  ngOnInit() {
    console.log(this.element)
  }
  rejectLeave() {
    let leaveId = this.element.id;
    if (leaveId !== undefined)
      this.leaveService.rejectLeave(leaveId, this.feedback).subscribe(json => {
        let x = this.leaves
        this.leaves = x.map(el=> {
          if (el.id == leaveId) {
            el.status = "Rejected"
            el.feedback = this.feedback
          }
          return el
        })
      })
    this.dialogRef.close()
  }
  acceptLeave() {
    let leaveId = this.element.id;
    if (leaveId !== undefined)
      this.leaveService.acceptLeave(leaveId).subscribe(json=> {
        let x = this.leaves;
        this.leaves = x.map(el=> {
          if (el.id == leaveId) {
            el.status = "Approved"
          }
          return el
        })
      })
    this.dialogRef.close()
  }
}


  // convertTime(time:string) : string{
  //   let timeArr = time.split(" ");
  //   if (timeArr[1] == "PM") timeArr[0] = timeArr[0].split(";")+12
  //   if (time.split(":")[0].length == 1) return "0"+time+":00"
  //   return time+":00";
  // }