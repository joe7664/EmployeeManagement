import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Leave } from 'src/app/models/Leave';
import { AdminService } from 'src/app/services/admin.service';
import { ManagerServiceService } from 'src/app/services/manager-service.service';
import {LeaveService} from 'src/app/services/leaves.service'
import { Employee } from 'src/app/models/Employee';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-admin-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class LeavesAdminComponent implements OnChanges{
  @Input() leaves:Leave[] = []
  @Input() employee:Employee = {}
  expandedElement:Leave = {}
  val:string;
  types = ["Vacation","Holiday", "Medical", "Bereavement", "Personal", "Parental"]
  leaveColumns = ['name', 'startDate', 'endDate', 'status', 'type', 'notes','feedback',  ]
  constructor(private adminService: AdminService, private leaveService:LeaveService, private cd: ChangeDetectorRef) {
    this.val = "Vacation"
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }
  submit(element:Leave) {

  }
  deleteLeave(element:Leave) {
    this.adminService.deleteLeave(element).subscribe(data => {
      console.log("Deleted Element")
    })
    let temp = this.leaves;
    this.leaves = temp.filter(el => el.id !== element.id)
  }

  toggleRow(element: Leave) {
    this.expandedElement = element
    this.cd.detectChanges();
   }

}
