import { Component, Input } from '@angular/core';
import { Leave } from 'src/app/models/Leave';
import { LeaveService } from 'src/app/services/leaves.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-leave-requests',
  templateUrl: './leave-requests.component.html',
  styleUrls: ['./leave-requests.component.css']
})
export class LeaveRequestsComponent {
  @Input()leaves: Leave[]=[];
  

  displayedColumns: string[] = ['Start Date', 'End Date', 'Type', 'Status', 'Notes'];
  constructor(private leaveService:LeaveService){}

  ngOnInit():void{
    this.leaveService.viewLeaves().subscribe(json => this.leaves = json);
  }
  onChanges(){
    this.ngOnInit();
  }
}
