import { Component } from '@angular/core';
import { Leave } from 'src/app/models/Leave';
import { LeaveService } from 'src/app/services/leaves.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-leave-apply',
  templateUrl: './leave-apply.component.html',
  styleUrls: ['./leave-apply.component.css']
})
export class LeaveApplyComponent {
  date: Date = new Date();
  tomorrow:string='';
  leave: Leave={
    startDate:undefined,
    endDate:undefined,
    leaveType:'',
    status:'Submitted',
    notes:'n/a'
  }

  constructor(private leaveService: LeaveService, private emp: LoginService){ }

  ngOnInit(){
    console.log(this.tomorrow)
    this.date.setDate(this.date.getDate()+1);
    this.tomorrow=this.date.toISOString().substring(0, 10);
  }
  submit(){
    this.leaveService.leaveRequest(this.leave, this.emp.id).subscribe(json => console.log(json));
  }
}
