import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Leave } from 'src/app/models/Leave';
import { LeaveService } from 'src/app/services/leaves.service';
import { ManagerServiceService } from 'src/app/services/manager-service.service';
import { DialogData } from '../manager.component';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent {

  searchName:string = ""
  fullLeaves:Leave[] = []
  leaves:Leave[] = []
  leaveColumns = ['name', 'startDate', 'endDate', 'status', 'notes','feedback', 'action']
  constructor(public dialog: MatDialog, private managerService:ManagerServiceService){}
  log() {
    console.log(this.leaves)
  }
  searchChange(name:string) {
    console.log(name)
    let x:Leave[] = []
    x = this.fullLeaves.filter(el => {
      return el.firstname?.toLowerCase()?.startsWith(name.toLowerCase()) || el.lastname?.toLowerCase()?.startsWith(name.toLowerCase())
    })
    this.leaves = x
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
  ngOnInit() {
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

@Component({
  selector: 'leave-action',
  templateUrl: './leaveAction.component.html',
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
