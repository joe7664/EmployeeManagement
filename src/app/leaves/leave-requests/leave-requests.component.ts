import { Component } from '@angular/core';
import { Leave } from 'src/app/models/Leave';
import { LeaveService } from 'src/app/services/leaves.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-leave-requests',
  templateUrl: './leave-requests.component.html',
  styleUrls: ['./leave-requests.component.css']
})
export class LeaveRequestsComponent {

  leaves: Leave[]=[];

  displayedColumns: string[] = ['Start Date', 'End Date', 'Type', 'Status', 'Notes'];
  constructor(private leaveService:LeaveService, private loginService:LoginService){}

  ngOnInit():void{
    this.leaveService.viewLeaves(this.loginService.id).subscribe(json => this.leaves = json);
  }
}
