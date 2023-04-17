import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/models/Employee';
import { ManagerServiceService } from 'src/app/services/manager-service.service';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-manager-component',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent {
  employees:Employee[] = []

  displayedColumns: string[] = ['id', 'First Name', 'Last Name', 'Email', 'Availability'];
  constructor(private managerService:ManagerServiceService, public dialog: MatDialog){}
  getEmployees(){
    this.managerService.getEmployees().subscribe(data => {
      this.employees = data
      console.log("EMPLOYEES", data)
    })
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      data: {
        animal: 'panda',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ngOnInit() {
    this.getEmployees();
  }
  

}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'manager.component.availability.html',
})
export class DialogContentExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}