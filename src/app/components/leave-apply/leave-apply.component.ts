import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { Employee } from 'src/app/models/Employee';
import { Leave } from 'src/app/models/Leave';
import { LeaveService } from 'src/app/services/leaves.service';
import { LoginService } from 'src/app/services/login.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-leave-apply',
  templateUrl: './leave-apply.component.html',
  styleUrls: ['./leave-apply.component.css']
})
export class LeaveApplyComponent {
  date: Date = new Date();
  end: Date = new Date();
  tomorrow:string='';
  available:string='';
  leave: Leave={
    startDate:this.date,
    endDate:undefined,
    leaveType:'',
    status:'Submitted',
    notes:'n/a'
  };
  employee: Employee = {
    leaveBalance:0,
    id:this.loginService.id
  };

  constructor(private leaveService: LeaveService, private loginService: LoginService, private profileService: ProfileService){
    
  }

  ngOnInit() :void{
    this.profileService.retrieveInfo(this.loginService.id).subscribe(json => this.employee = json);
    this.date.setDate(this.date.getDate()+1);
    this.tomorrow=this.date.toISOString().substring(0, 10);
    this.leave.startDate=this.date;
    console.log("full start date: ", this.leave.startDate);
  }
  onChange(changes:any){
    console.log("selection changes: ", changes);
    if(this.employee.leaveBalance!=undefined && this.leave.startDate!=undefined){
      console.log("start date: ", this.leave.startDate);
      this.end=new Date(this.leave.startDate);
      this.end.setDate(new Date(this.leave.startDate).getDate()+this.employee.leaveBalance);
      console.log("end date: ", this.end);
      this.available=this.end.toISOString().substring(0, 10);
      console.log("end date by available days: ", this.available);
    }
  }
  submit(){
    console.log(this.employee.leaveBalance);
    this.leaveService.leaveRequest(this.leave, this.loginService.id).subscribe(json => console.log(json));
  }
}
