import { Component } from '@angular/core';
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
  end: Date = new Date(this.date);
  tomorrow:string='';
  available:string='';
  leave: Leave={
    startDate:undefined,
    endDate:undefined,
    leaveType:'',
    status:'Submitted',
    notes:'n/a'
  };
  employee: Employee = {
    leaveBalance:1,
    id:this.loginService.id
  };

  constructor(private leaveService: LeaveService, private loginService: LoginService, private profileService: ProfileService){
    
  }

  ngOnInit() :void{
    this.profileService.retrieveInfo(this.loginService.id).subscribe(json => this.employee = json);
    this.date.setDate(this.date.getDate()+1);
    this.tomorrow=this.date.toISOString().substring(0, 10);
  }
  submit(){
    console.log(this.employee.leaveBalance)
    this.leaveService.leaveRequest(this.leave, this.loginService.id).subscribe(json => console.log(json));
  }
}
