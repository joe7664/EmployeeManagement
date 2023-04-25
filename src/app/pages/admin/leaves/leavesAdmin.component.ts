import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Leave } from 'src/app/models/Leave';
import { AdminService } from 'src/app/services/admin.service';
import { ManagerServiceService } from 'src/app/services/manager-service.service';
import {LeaveService} from 'src/app/services/leaves.service'
import { Employee } from 'src/app/models/Employee';

@Component({
  selector: 'app-admin-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesAdminComponent implements OnChanges{
  @Input() leaves:Leave[] = []
  @Input() employee:Employee = {}
  expandedElement:Leave = {}
  leaveColumns = ['name', 'startDate', 'endDate', 'status', 'notes','feedback', ]
  constructor(private adminService: AdminService, private leaveService:LeaveService, private cd: ChangeDetectorRef) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  toggleRow(element: Leave) {
    this.expandedElement = element
    this.cd.detectChanges();
   }

}
