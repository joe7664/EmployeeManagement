import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/components/manager/manager.component';
import { Employee } from 'src/app/models/Employee';
import { Goal } from 'src/app/models/Goal';
import { Leave } from 'src/app/models/Leave';
import { AdminService } from 'src/app/services/admin.service';
import { LoginService } from 'src/app/services/login.service';
import {LeaveService} from 'src/app/services/leaves.service'
import { GoalsService } from 'src/app/services/goals.service';


interface showValues {
  value:'leave'|'goal'|'register'
}
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  email:string="";
  fName:string="";
  lName:string = "";
  phone:string="";
  managerId:string="";
  message:string="";
  isManager:string="";
  employees:Employee[] = []
  show:showValues = {value:"register"}
  leaves:Leave[] = []
  goals:Goal[] = []

  
  constructor(private loginService:LoginService, private adminService:AdminService,public dialog: MatDialog, 
    private leaveService:LeaveService, private goalService:GoalsService){}

  regPassword:string="";
  displayedColumns: string[] = ['ID', 'Name', 'Leave', 'Email', 'Availability', 'Leaves','Goals'];
  register() {
    this.loginService.register({
      email:this.email, 
      password:this.regPassword, 
      firstName:this.fName, 
      lastName:this.lName, 
      phoneNumber:this.phone, 
      managerId:this.managerId as unknown as number,
      isManager:this.isManager as unknown as number,
      }).subscribe(
        (data) => {
        this.message = "Employee created Succesfully"
      }, (error) => {
        console.log(error)
        this.message= error.error
      })
  }
  patch(emp:Employee) {
    
  }
  showLeave(emp:Employee) {
    this.leaveService.viewLeaves(emp.id as unknown as number).subscribe(data => {
      this.leaves = data;
      console.log(data)
      this.show.value = "leave";
    })
  }
  showGoal(emp:Employee) {
    this.adminService.getGoalsByEmployee(emp).subscribe(data => {
      this.goals = data;
      this.show.value = "goal"
      console.log(data)
    })
  }
  openDialog(emp:Employee) {
    const dialogRef = this.dialog.open(PatchEmployee, {
      data: {
        employee:emp,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ngOnInit() {
    this.adminService.getEmployees().subscribe(data => {
      console.log("Employees", data);
      this.employees = data;
    })
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'patch.component.html',
})
export class PatchEmployee {
  employee:Employee = {}
  
  constructor(public dialogRef: MatDialogRef<PatchEmployee>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private adminService:AdminService) {
      this.employee = data.employee
    }
    patch() {
      this.adminService.patchEmployee(this.employee).subscribe(data=> {
        console.log(data)
      })
    }
  ngOnInit() {
    console.log(this.employee);
  }
  closeDialog() {
    this.dialogRef.close()
  }
}