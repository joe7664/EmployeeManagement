import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/models/Employee';
import { Leave } from 'src/app/models/Leave';
import { LeaveService } from 'src/app/services/leaves.service';
import { ManagerServiceService } from 'src/app/services/manager-service.service';

export interface DialogData {
  leaves: Leave[];
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

  displayedColumns: string[] = ['First Name', 'Last Name', 'Email', 'Availability'];
  constructor(private managerService:ManagerServiceService, public dialog: MatDialog, private leaveService : LeaveService){}
  getEmployees(){
    this.managerService.getEmployees().subscribe(data => {
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
    this.managerService.getEmployeeLeave(employeeID).subscribe(data=> {
      console.log("DATA", data)
      this.openDialog(data)
    })
  }
  findAvailable() {
    this.managerService.findAvailableEmployees({"startDate":this.startDate,"endDate":this.endDate, "status":"Submitted"}).subscribe(data => {
      console.log("AVAILABLE", data)
      this.employees = data;
    })
  }

  openDialog(leaves:Leave[]) {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      data: {
        leaves,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  getRequests() {
    

  }
  rejectLeave(leaveId:number) {
    console.log(leaveId)
    this.leaveService.rejectLeave(leaveId).subscribe(json => {
      let x = this.leaves
      this.leaves = x.map(el=> {
        if (el.id == leaveId) {
          el.status = "Rejected"
        }
        return el
      })
    })
  }
  acceptLeave(leaveId:number) {
    this.leaveService.acceptLeave(leaveId).subscribe(json=> {
      let x = this.leaves;
      this.leaves = x.map(el=> {
        if (el.id == leaveId) {
          el.status = "Approved"
        }
        return el
      })
    })
  }
  ngOnInit() {
    this.getEmployees();
    this.managerService.getLeaveRequests().subscribe(json => {
      let temp : Leave[]= []
      json.map((el) => {
        if (el.status == "Submitted") temp.push(el);
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

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'manager.component.availability.html',
})
export class DialogContentExampleDialog {
  leaves:Leave[] = []
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.leaves = this.data.leaves;
  }
  ngOnInit() {
    console.log(this.leaves)
  }
}