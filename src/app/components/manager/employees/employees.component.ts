import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/models/Employee';
import { Goal } from 'src/app/models/Goal';
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
      
      // console.log("EMPLOYEES", data)
    })

  }
  getAvailability(employeeID:number) {
    // this.managerService.getEmployeeLeave(employeeID).subscribe(data=> {
    //   console.log("DATA", data)
      // this.openDialog(data)
    // })
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